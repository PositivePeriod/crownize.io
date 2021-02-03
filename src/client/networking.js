import io from 'socket.io-client';
import { processGameUpdate } from './render';
import { createDisconnectGame } from './wait-game';
const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });

const connectedPromise = new Promise(resolve => {
    socket.on('connect', () => {
        console.info('Connected to server');
        resolve();
    });
});

export const connect = gameOverCallback => (
    connectedPromise.then(() => {
        socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
        socket.on(Constants.MSG_TYPES.GAME_OVER, gameOverCallback);
        socket.on('disconnect', disconnectFromServer);
    })
);

export const play = username => {
    console.info(`Join game as ${username}`);
    socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

export const updateCommand = command => {
    if (command !== null) {
        console.info(`Input | `, command);
        socket.emit(Constants.MSG_TYPES.INPUT, command);
    }
};

function disconnectFromServer() {
    console.info('Disconnected from server.');
    //
    createDisconnectGame();
}