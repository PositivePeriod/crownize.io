export function createWaitGame(container) {
    // lobby
    container.appendChild(createIntroduce());
    container.appendChild(createUserInput());
    container.appendChild(creatInfo());
}

function createWaitInfo() {
    var waitInfo = document.createElement("div");
    waitInfo.setAttribute("id", "wait-info");

    var h1 = document.createElement("h1");
    var h1Text = document.createTextNode("Waiting for players");
    h1.appendChild(h1Text);

    var h2 = document.createElement("h2");
    var h2Text = document.createTextNode("0 of 0");
    h2.appendChild(h2Text);

    var h2 = document.createElement("h2");
    var h2Text = document.createTextNode("Disconnected from Server");
    h2.appendChild(h2Text);

    var hr = document.createElement("hr");

    var reconnect = document.createElement("button");
    reconnect.setAttribute("id", "reconnect-button");

    var reconnectText = document.createTextNode("Reconnect to Server");
    reconnect.appendChild(reconnectText);

    disconnect.appendChild(h2);
    disconnect.appendChild(hr);
    disconnect.appendChild(reconnect);
    container.appendChild(disconnect);
}

/*
<h1 class="queue-title">Waiting for players...</h1>
<h2>6 of 8 </h2>
<p>Game automatically starting in 1:08</p>
<div>
    <div>
        <p style="margin-right: 3px; display: inline;">You are:</p><span class="inline-color-block teal"></span>
    </div>
    <p class="queue-gong-message">We'll play a gong sound when the game starts. Turn your volume up!</p>
</div>
<button class="" style="display: block;">Force Start 3 / 5</button>
<button class="small">Cancel</button><br>
<div class="tips-banner">
    <p class="tips-title bold unselectable">Tip:</p>
    <p class="small unselectable"><span>Press <span class="highlight">[Q]</span> to clear all queued moves.</span></p>
</div>
*/


export function createDisconnectGame(container) {
    var disconnect = document.createElement("div");
    disconnect.setAttribute("id", "disconnect-game");

    var h2 = document.createElement("h2");
    var h2Text = document.createTextNode("Disconnected from Server");
    h2.appendChild(h2Text);

    var hr = document.createElement("hr");

    var reconnect = document.createElement("button");
    reconnect.setAttribute("id", "reconnect-button");
    reconnect.onclick = () => { window.location.reload() };

    var reconnectText = document.createTextNode("Reconnect to Server");
    reconnect.appendChild(reconnectText);

    disconnect.appendChild(h2);
    disconnect.appendChild(hr);
    disconnect.appendChild(reconnect);
    container.appendChild(disconnect);
}