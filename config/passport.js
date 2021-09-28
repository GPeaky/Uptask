const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo donde vamos a utentificar
const Users = require('../models/users');


// LocalStraegy - Login con credenciales propia
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done) => {
        try {
            const user = await Users.findOne({
                where: {
                    email,
                    active: 1
                }
            });

            // Usuario Existe, contraseña Incorrecta
            if(!user.verifyPassword(password)){
                return done(null, false, {
                    message: 'Incorrect Password'
                })
            }

            return done(null, user, {
                message: 'Logged In Successfully'
            })

        }catch(err){
            console.log(err)
            // Ese usuario no existe
            return done(null, false, {
                message: 'El usuario no existe'
            })
        }
    }
));

// Serializar el usuario

passport.serializeUser((user, done) => {
    done(null, user);
});

// deserializar el usuario

passport.deserializeUser((user, done) => {
    done(null, user);
})

module.exports = passport;