import { connect, play, updateCommand } from './networking';
import { inputDeque, startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { setHidden } from '../shared/util';


import { createBeforeGame } from './before-game';
import { createPlayGame } from './play-game';
import './css/style.css';

const container = document.getElementById('container');
var interval = null;

Promise.all([connect(onGameOver), downloadAssets()]).then(beforeGame).catch(console.error);

function beforeGame() {
    removeAllChildNodes(container);
    createBeforeGame(container);

    const usernameInput = document.getElementById('username-input');
    const startButton = document.getElementById('start-button');
    usernameInput.focus();
    startButton.onclick = playGame;
}

function waitGame() {
    // lobby
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;
    play(username);

    removeAllChildNodes(container);
    // createWaitGame(container);
    // if receive signal then
    playGame();
}

function playGame() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;

    removeAllChildNodes(container);
    createPlayGame(container);

    play(username);

    console.log('playGame');

    startCapturingInput();
    interval = setInterval(() => { updateCommand(inputDeque.pop()); }, 500);
}

function onGameOver() {
    clearInterval(interval);
    stopCapturingInput();

    removeAllChildNodes(container);
    // make something
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}