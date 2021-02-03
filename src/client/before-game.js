import { INFO } from "../shared/constants";

export function createBeforeGame(container) {
    var beforeGame = document.createElement("div");
    beforeGame.setAttribute("id", "before-game");
    beforeGame.classList.add('center');
    beforeGame.appendChild(createIntroduce());
    beforeGame.appendChild(createUserInput());
    beforeGame.appendChild(createInfo());
    container.appendChild(beforeGame);
}

function createIntroduce() {
    var introduce = document.createElement("div");
    introduce.setAttribute("id", "introduce")

    var h1 = document.createElement("h1");
    var h1Text = document.createTextNode("crownize.io");
    h1.appendChild(h1Text);

    var h4 = document.createElement("h4");
    var h4Text = document.createTextNode("Protect your crown & Dominate others");
    h4.appendChild(h4Text);

    introduce.appendChild(h1);
    introduce.appendChild(h4);
    return introduce;
}

function createUserInput() {
    var userInput = document.createElement("div");
    userInput.setAttribute("id", "user-input")

    var usernameInput = document.createElement("input");
    usernameInput.setAttribute("id", "username-input");
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("placeholder", "Anonymous");

    var startButton = document.createElement("button");
    startButton.setAttribute("id", "start-button")

    var buttonText = document.createTextNode("PLAY");
    startButton.appendChild(buttonText);

    userInput.appendChild(usernameInput);
    userInput.appendChild(startButton);
    return userInput;
}

function createInfo() {
    var info = document.createElement("div");
    info.setAttribute("id", "info")

    var version = document.createElement("a");
    version.setAttribute("href", "/version");

    var versionText = document.createTextNode("Version: Alpha");
    version.appendChild(versionText);

    var mail = document.createElement("a");
    mail.setAttribute("href", `mailto:${INFO.CONTACT}`);

    var mailText = document.createTextNode(`Contact: ${INFO.CONTACT}`);
    mail.appendChild(mailText);

    var copyright = document.createElement("a");
    copyright.setAttribute("title", "copyright");

    var copyrightText = document.createTextNode("© 2021 PositivePeriod, All Rights Reserved.");
    copyright.appendChild(copyrightText);

    info.appendChild(version);
    info.appendChild(mail);
    info.appendChild(copyright);

    return info;
}