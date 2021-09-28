const { Router } = require('express');
const { proyectHome } = require('../controllers/dashboard');
const { isAuthenticated } = require('../helpers/auth');
const router = Router();

router.get('/', [
    isAuthenticated
],proyectHome);

module.exports = router;