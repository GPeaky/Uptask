const { Router } = require('express');
const { check } = require('express-validator');
const { newProyect, saveProyect, updateProyect } = require('../controllers/newProyect');
const { isAuthenticated } = require('../helpers/auth');
const { validate } = require('../middlewares/validate');
const router = Router();

router.get('/', [
    isAuthenticated
],newProyect);

router.post('/', [
    check('name', 'Nombre invalido').not().isEmpty().trim().escape(),
    isAuthenticated,
    validate
],saveProyect);

router.post('/:id', [
    check('name', 'Nombre invalido').not().isEmpty().trim().escape(),
    isAuthenticated,
    validate
], updateProyect)

module.exports = router;