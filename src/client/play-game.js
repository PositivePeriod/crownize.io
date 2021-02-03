import { GAME_OPTION } from "../shared/constants";

export function createPlayGame(container) {
    container.appendChild(createGameMap());
    container.appendChild(createChatWindow());
    container.appendChild(createLeaderboard());
    container.appendChild(createTurnCounter());
}

function createGameMap() {
    var gameTable = document.createElement("table");
    gameTable.setAttribute("id", "game-map")

    for (var i = 0; i < GAME_OPTION.MAP_SIZE; i++) {
        var row = gameTable.insertRow(i);
        for (var j = 0; j < GAME_OPTION.MAP_SIZE; j++) {
            row.insertCell(j);
        }
    }
    return gameTable;
}

function createChatWindow() {
    var chatWindow = document.createElement("div");
    chatWindow.setAttribute("id", "chat-window");
    return chatWindow;
}

function createLeaderboard() {
    var leaderboard = document.createElement("table");
    leaderboard.setAttribute("id", "leaderboard");
    var lbBody = document.createElement("tbody");

    var row = document.createElement("tr");
    var string = ['Player', 'Army', 'Land'];
    for (var j = 0; j < 3; j++) {
        var cell = document.createElement("th");
        var cellText = document.createTextNode(string[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    lbBody.appendChild(row);

    for (var i = 0; i < 5; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode("-");
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        lbBody.appendChild(row);
    }
    leaderboard.appendChild(lbBody);
    return leaderboard;
}

function createTurnCounter() {
    var turnCounter = document.createElement('div');
    turnCounter.setAttribute("id", "turn-counter");

    var turnText = document.createTextNode('Turn');
    turnCounter.appendChild(turnText);
    return turnCounter;
}

export function createGameResult(container) {
    var gameResult = document.createElement('div');
    gameResult.setAttribute("id", "game-result");

    var h1 = document.createElement("h1");
    var h1Text = document.createTextNode("Game Over");
    h1.appendChild(h1Text);

    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode("You were defeated");
    h4.appendChild(h4Text);

    var playAgain = document.createElement("button");
    var playAgainText = document.createTextNode("Play Again");
    playAgain.appendChild(playAgainText);

    var exit = document.createElement("h4");
    var exitText = document.createTextNode("Exit");
    exit.appendChild(exitText);

    gameResult.appendChild(h1);
    gameResult.appendChild(h4);
    gameResult.appendChild(playAgainh1);
    gameResult.appendChild(exit);

    container.appendChild(gameResult);
}