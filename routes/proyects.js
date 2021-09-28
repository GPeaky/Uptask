const { Router } = require('express');
const { proyectByUrl, proyectEdit, proyetDelete } = require('../controllers/proyects');
const { isAuthenticated } = require('../helpers/auth');
const router = Router();

router.get('/:url', [
    isAuthenticated
],proyectByUrl);

router.get('/edit/:id', [
    isAuthenticated
],proyectEdit)

router.delete('/:url', [
    isAuthenticated
],proyetDelete)

module.exports = router;