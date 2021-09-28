const Sequelize = require('sequelize');
const db = require('../config/database');
const Proyect = require('./Proyect');

const Tasks = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    task: Sequelize.STRING(100),
    status: Sequelize.INTEGER(1)
});

Tasks.belongsTo(Proyect);

module.exports = Tasks;