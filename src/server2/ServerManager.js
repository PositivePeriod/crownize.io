const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');
const logger = require('../../config/winston')
const webpackConfig = require('../../webpack.dev');
const MSG = require('../shared/constants');
const LobbyManager = require('./LobbyManager');


// ServerManager
var app = express();
app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
} else {
    app.use(express.static('dist'));
}

const port = process.env.PORT || 3000;
var server = app.listen(port);
logger.debug(`Server listening on port ${port}`);


var accountList = new Map();
const lobby = new LobbyManager();

var io = socketio(server);
io.on(MSG.CONNECT_SERVER, socket => {
    logger.info(`Account connect ; ${socket.id}`);
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
    logger.info(`Account join lobby ; ${this.id}`);
    this.emit(MSG.JOIN_LOBBY, lobby.info);
}

function joinGame(room) {
    logger.info(`Account join room ; ${this.id} ${room.id}`);

    game.tryToAddPlayer.push([this, username]);
}

function handleInput(data) {
    logger.info(`Get command ; ${id}`);
    game.handleInput(this, command);
}

function getLobby(data) {

}

function getLobby(data) {

}

function disconnect() {
    logger.info(`Account disconnect ; ${this.id}`);
    socketList.delete(this.id);
}