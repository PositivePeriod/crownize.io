import escape from 'lodash/escape';
import { GAME_OPTION } from '../shared/constants';


export function processGameUpdate(update) {
    if (update.turn % 10 === 0) {
        console.info(`Update | ${update.turn}`);
    }
    updateTurn(update.turn);
    updateLeaderboard(update.leaderboard);
    var colorMap = new Map();
    update.leaderboard.forEach(value => {
        const [username, unit, color] = value;
        colorMap.set(username, color);
    })
    updateMap(update.map, colorMap);
}

function updateTurn(turn) {
    const turnCounter = document.getElementById('turn-counter');
    turnCounter.innerHTML = `Turn ${turn}`;
}

function updateLeaderboard(lbData) {
    const rows = document.querySelectorAll('#leaderboard tbody tr');
    for (let i = 0; i < lbData.length; i++) {
        var row = rows[i + 1];
        row.cells[0].innerHTML = escape(lbData[i][0].slice(0, 15)).toString() || "Anonymous";
        row.cells[1].innerHTML = lbData[i][1];
    }
    for (let i = lbData.length; i < 5; i++) {
        var row = rows[i + 1];
        row.cells[0].innerHTML = '-';
        row.cells[1].innerHTML = '-';
    }
}

function updateMap(gameMap, colorMap) {
    const gameTable = document.getElementById('game-map');

    for (var i = 0; i < GAME_OPTION.MAP_SIZE; i++) {
        for (var j = 0; j < GAME_OPTION.MAP_SIZE; j++) {
            var cell = gameTable.rows[j].cells[i];
            if (gameMap[i][j] === null) {
                cell.classList.add('Fog');
            } else {
                cell.classList.add(gameMap[i][j].type);
                cell.innerHTML = gameMap[i][j].unit === 0 ? '' : gameMap[i][j].unit.toString();
                cell.style.backgroundColor = colorMap.get(gameMap[i][j].username) ? colorMap.get(gameMap[i][j].username) : "white";
            }
        }
    }
}