const Sequelize = require('sequelize');
const db = require('../config/database');
const Proyects = require('./Proyect');
const bcrypt = require('bcrypt-nodejs');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A email/password is required"
            },
            isEmail: {
                msg: "A valid email is required"
            }
        },
        unique: {
            args: true,
            msg: "Email already in use!"
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A email/password is required"
            }
        }
    },

    active: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },

    token: {
        type: Sequelize.STRING
    },

    expiration: {
        type: Sequelize.DATE
    }

}, {
    hooks:{
        beforeCreate: user => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});

Users.hasMany(Proyects);

// Methods personalizados
Users.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = Users;