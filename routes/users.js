const { Router } = require('express');
const { formCreateUser, 
    formLogin, 
    createUser, 
    loginUser, 
    logOut, 
    formForgotPassword, 
    forgotPassword, 
    resetPassword, 
    updatePassword, 
    verifyEmail } = require('../controllers/users');
const router = Router();

router.get('/register', formCreateUser);

router.get('/login', formLogin);

router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/logout', logOut);

router.get('/forgot-password', formForgotPassword);

router.post('/forgot-password', forgotPassword);

router.get('/reset-password/:token', resetPassword);

router.post('/reset-password/:token', updatePassword);

router.get('/verification/:email', verifyEmail)

module.exports = router;