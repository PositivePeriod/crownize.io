import escape from 'lodash/escape';
import Constants from '../shared/constants';


export function processGameUpdate(update) {
    console.info(`Update | ${update.turn}`);
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
    for (let i = 0; i < rows.length; i++) {
        var row = rows[i];
        row.cells[0].innerHTML = escape(lbData[i][0].slice(0, 15)) || "Anonymous";
        row.cells[1].innerHTML = lbData[i][1];
    }
    for (let i = rows.length; i < 5; i++) {
        var row = rows[i + 1];
        row.cells[0].innerHTML = '-';
        row.cells[1].innerHTML = '-';
    }
}

function updateMap(gameMap, colorMap) {
    const gameTable = document.getElementById('game-map');

    for (var i = 0; i < Constants.MAP_SIZE; i++) {
        for (var j = 0; j < Constants.MAP_SIZE; j++) {
            var cell = gameTable.rows[j].cells[i];
            if (gameMap[i][j] === null) {
                cell.innerHTML = 'Fog';
                cell.style.backgroundColor = 'gray';
            } else {
                cell.innerHTML = `${gameMap[i][j].type}\n${gameMap[i][j].unit}`
                cell.style.backgroundColor = colorMap.get(gameMap[i][j].username) ? colorMap.get(gameMap[i][j].username) : "white";
            }
        }
    }
}