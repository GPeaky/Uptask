const { Router } = require('express');
const { createTask, updateTaskStatus, deleteTasks } = require('../controllers/tasks');
const { isAuthenticated } = require('../helpers/auth');
const router = Router();

router.post('/:url', [
    isAuthenticated
],createTask);

router.patch('/:id', [
    isAuthenticated
],updateTaskStatus)

router.delete('/:id', [
    isAuthenticated
],deleteTasks);

module.exports = router;