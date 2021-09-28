const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');
const db = require('../config/database');

const Proyects = db.define('proyects', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : Sequelize.STRING(100),
    url: Sequelize.STRING(100)
}, {
    hooks: {
        beforeCreate(proyect){
            const url = slug(proyect.name).toLowerCase();

            proyect.url = `${url}-${shortid.generate()}`;
        }
    }
})

module.exports = Proyects;