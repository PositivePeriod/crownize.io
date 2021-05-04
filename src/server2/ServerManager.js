var express = require('express');

// webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.dev');

// session
var session = require('express-session')
var FileStore = require('session-file-store')(session)

// flash
const flash = require('connect-flash');

// PassportJS
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// SocketIO
const socketio = require('socket.io');
const MSG = require('../shared/constants');

// other
require('dotenv').config();
// const LobbyManager = require('./LobbyManager');
// const lobby = new LobbyManager();

const DBManager = require('../../database/dbManager');

class ServerManager {
    constructor() {
        const logger = require('../../logs/winston')
        this.logger = logger();
        this.db = new DBManager();

        this.app = express();
        this.serveStaticFile();
        this.initializeSession();
        this.initializeFlash();
        this.initializePassport();
        this.routing();
        this.start();
    }

    serveStaticFile() {
        this.app.use(express.static('public'));
        if (process.env.NODE_ENV === 'development') {
            const compiler = webpack(webpackConfig);
            this.app.use(webpackDevMiddleware(compiler));
        } else {
            this.app.use(express.static('dist'));
        };
    }

    initializeSession() {
        this.app.use(session({
            HttpOnly: true,
            secure: true,
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUnintialized: true,
            store: new FileStore()
        }));
    }

    initializeFlash() {
        this.app.use(flash());
    }

    initializePassport() {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.deserializeUser(function(user, done) {
            console.log('serializeUser', user);
            done(null, user.id)
        });

        passport.serializeUser(function(id, done) {
            var user = this.db.getUserByID(id);
            done(null, user);
        });
        passport.use(new LocalStrategy({
                usernameField: 'userID',
                passwordField: 'userPW'
            },
            function(userID, userPW, done) {
                var hashedPW = this.db.getUserPWByUserID(userID);
                if (hashedPW) {
                    bcrypt.compare(userPW, hashedPW, function(err, result) {
                        if (result) {
                            return done(null, user, { message: 'Login Successfully' });
                        } else {
                            return done(null, false, { message: 'ID or Password is incorrect' });
                        }
                    });
                } else {
                    return done(null, false, { message: 'ID or Password is incorrect' });
                }
            }
        ));
    }

    routing() {
        var indexRouter = require('./routes/index');
        var topicRouter = require('./routes/topic');
        var authRouter = require('./routes/auth')(passport);

        this.app.use('/', indexRouter);
        this.app.use('/topic', topicRouter);
        this.app.use('/auth', authRouter);

        this.app.use(function(req, res, next) {
            res.status(404).send('404 Error');
        });
        this.app.use(function(err, req, res, next) {
            console.error(err.stack)
            this.logger.error(err.stack);
            res.status(500);
            res.render('500 error', { error: err });
        });
    }

    start() {
        const port = process.env.PORT || 3000;
        this.server = this.app.listen(port, function() {
            console.log(`Server listening on port ${port}`)
            this.logger.debug(`Server listening on port ${port}`);
            this.initializeSocket();
        }.bind(this));
    }

    initializeSocket() {
        this.io = socketio(this.server);
        this.io.on(MSG.CONNECT_SERVER, socket => {
            this.logger.info(`Account connect ; ${socket.id}`);
            socket.emit(MSG.CONNECT_SERVER, socket.id);
            socketList.set(socket.id, socket);

            // this === socket
            socket.on(MSG.JOIN_LOBBY, joinLobby);
            socket.on(MSG.JOIN_ROOM, joinGame);
            socket.on(MSG.LEAVE_ROOM, joinGame);
            socket.on(MSG.UPDATE_GAME, joinGame);
            socket.on(MSG.DISCONNECT_SERVER, disconnect);
        });

        function joinLobby() {
            this.logger.info(`Account join lobby ; ${this.id}`);
            this.emit(MSG.JOIN_LOBBY, lobby.info);
        }

        function joinGame(room) {
            this.logger.info(`Account join room ; ${this.id} ${room.id}`);

            game.tryToAddPlayer.push([this, username]);
        }

        function handleInput(data) {
            this.logger.info(`Get command ; ${id}`);
            game.handleInput(this, command);
        }

        function getLobby(data) {

        }

        function disconnect() {
            this.logger.info(`Account disconnect ; ${this.id}`);
            socketList.delete(this.id);
        }

        function tryToLogin(socket, userID, userPW) {
            var database = "";
            var succeed = (database[userID].pw === userPW);
            if (succeed) {
                this.verified = true;

                var account = Account(socket, userID, userPW)

                /* loadData() */
                var data = database[userID];
                this.username = data.name;
                this.stats = { win: 0, lose: 0 };

                return true
            } else {
                return false
            }
        }
    }
}

var gameServer = new ServerManager();