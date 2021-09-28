const Sequelize = require('sequelize');
const Users = require('../models/users');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const crypto = require('crypto');
const Op = Sequelize.Op;
const sendEmail = require('../handlers/email');

const formCreateUser = (req, res) => {
    res.render('register', {
        title: 'Register'
    })
}

const formLogin = (req, res) => {
    res.render('login', {
        title: 'Login - UpTask'
    })
};

const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        await Users.create({ email, password });

        // TODO creatr una url de confirmacion
        const validateUrl = `http://${req.headers.host}/verification/${email}`;

        // Enviar email
        await sendEmail({
            email,
            subject: 'Confirm your UpTak Account',
            url : validateUrl,
            file: 'validate-email'
        })

        // Redireccionar
        req.flash('correcto', 'Enviamos un correo, verifica tu cuenta');
        res.redirect('/login');
    } catch(err) {
        req.flash('error', err.errors.map(err => err.message));
        res.render('register', {
            mesages: req.flash(),
            title: 'Register',
            email, password
        })
    }
}

const loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
})

const logOut = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

const formForgotPassword = (req, res) => {
    res.render('forgot-password', {
        title: 'Forgot Password'
    })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await Users.findOne({
        where: {
            email 
        }
    });

    if(!user) {
        req.flash('error', 'User not found');
        res.redirect('/forgot-password');
    };


    user.token = crypto.randomBytes(20).toString('hex');
    user.expiration = Date.now() + 3600000;
    await user.save();

    const resetUrl = `http://${req.headers.host}/reset-password/${user.token}`;
    
    // Send email with token
    await sendEmail({
        email: user.email,
        subject: 'Reset Password',
        url : resetUrl,
        file: 'reset-password'
    })

    req.flash('correcto', 'Se ha enviado un mensaje a tu correo');
    res.redirect('/login')
}

const resetPassword = async (req, res) => {
    const { token } = req.params;

    const user = await Users.findOne({
        where: {
            token
        }
    })

    if(!user) {
        req.flash('error', 'User not found');
        res.redirect('/forgot-password')
    }

    res.render('reset-password', {
        title: 'Reset Password'
    })
}

const updatePassword = async (req, res) => {
    const { token } = req.params;

    const user = await Users.findOne({
        where: {
            token,
            expiration: {
                [Op.gte]: Date.now()
            }
        }
    })

    if(!user) {
        req.flash('error', 'Token invalid or expired');
        res.redirect('/forgot-password');
    }

    const { password } = req.body;
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    user.expiration = null;
    user.token = null;
    await user.save();

    req.flash('correcto', 'Password updated successfully');
    res.redirect('/login');
}

const verifyEmail = async (req, res) => {
    const { email } = req.params;

    const user = await Users.findOne({
        where: {
            email
        }
    });

    if(!user) {
        req.flash('error', 'Token invalid or expired');
        res.redirect('/register');
    }

    user.active = 1;
    await user.save();

    req.flash('correcto', 'Email verified successfully');
    res.redirect('/login');
}

module.exports = {
    formCreateUser,
    formLogin,
    createUser,
    loginUser,
    logOut,
    formForgotPassword,
    forgotPassword,
    resetPassword,
    updatePassword,
    verifyEmail
}