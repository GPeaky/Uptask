const express = require('express');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('../config/passport');;
const path = require('path');
const db = require('../config/database');
require('./Proyect');
require('./Users');
require('./Tasks');

class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            home: '/',
            newProyect: '/new-proyect',
            proyects: '/proyects',
            tasks: '/tasks'
        }

        // Database
        this.databaseConnection();
        // View Engine
        this.viewEngine();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    async databaseConnection() {
        try {
            await db.sync();
            console.log('Connection has been established successfully.');
        } catch (err) {
            console.error('Unable to connect to the database:', err);
        }
    }

    viewEngine() {
        // Enable Body Parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // Static Files
        this.app.use(express.static('public'));
        // Enable Pug
        this.app.set('view engine', 'pug');
        // Views Folder
        this.app.set('views', path.join(__dirname, '../views'));
    }

    middlewares() {
        // Cors
        this.app.use(require('cors')());
        // Parse
        this.app.use(express.json());
        // Flash messages
        this.app.use(flash());
        // Cookie Parser
        this.app.use(cookieParser());
        // Sessions
        this.app.use(session({
            secret: '_108082secret',
            resave: false,
            saveUninitialized: false
        }));
        // Passport
        this.app.use(passport.initialize());
        // Passport Session
        this.app.use(passport.session());
        // GLobal Variables
        this.app.use((req, res, next) => {
            res.locals.messages = req.flash();
            res.locals.user = req.user || {};
            next();
        })
    }

    routes(){
        this.app.use(this.paths.home, require('../routes/dashboard'));
        this.app.use(this.paths.newProyect, require('../routes/newProyect'));
        this.app.use(this.paths.proyects, require('../routes/proyects'));
        this.app.use(this.paths.tasks, require('../routes/tasks'));
        this.app.use(this.paths.home, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, (err) => {
            if (err) throw err;
            console.log('Server is running on port ' + this.port);
        });
    }
}

module.exports = Server;