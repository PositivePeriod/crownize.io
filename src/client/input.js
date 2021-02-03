import Constants from "../shared/constants";
import InputDeque from "../shared/deque";
import Point from "../shared/point";

const direction = {
    "ArrowLeft": new Point(-1, 0),
    "ArrowRight": new Point(1, 0),
    "ArrowUp": new Point(0, -1),
    "ArrowDown": new Point(0, 1)
};
const eventType = {
    "click": "Click",
    "dblclick": "DoubleClick",
    "contextmenu": "RightClick"
}


export const inputDeque = new InputDeque;
var focusedCell = null;
var focusedType = null;

export function startCapturingInput() {
    const gameTable = document.getElementById("game-map");
    gameTable.addEventListener("click", handleClick);
    gameTable.addEventListener("dblclick", handleClick);
    gameTable.addEventListener("contextmenu", handleClick);
    document.addEventListener("contextmenu", handleRightClick);
    window.addEventListener("keydown", handleKeyboard);

}

export function stopCapturingInput() {
    const gameTable = document.getElementById("game-map");
    gameTable.removeEventListener("click", handleClick);
    gameTable.removeEventListener("dblclick", handleClick);
    gameTable.addEventListener("contextmenu", handleClick);
    document.removeEventListener("contextmenu", handleRightClick);
    window.removeEventListener("keydown", handleKeyboard);
}

// 미리 가지고 있었던 data로 갈 수 있는지 평가


function handleClick(e) {
    if (e.type === "contextmenu") {
        handleRightClick(e);
    }

    var newFocusedCell = findClickedCell(e);
    var newFocusedType = eventType[e.type]

    if (focusedCell !== null && newFocusedType === "Click" && distanceBetweenCells(focusedCell, newFocusedCell) === 1) {
        var dir = directionBetweenCells(focusedCell, newFocusedCell);
        addCommand(focusedType, focusedCell, dir);
        focusedCell = null;
        focusedType = null;
    } else {
        focusedCell = newFocusedCell;
        focusedType = newFocusedType;
    }
    console.info(`Cell | ${focusedType} | ${focusedCell}`);
}

function findClickedCell(e) {
    var td = e.target.closest("td");
    var col = td.cellIndex;
    var row = td.parentNode.rowIndex;
    return new Point(col, row);
}

function handleRightClick(e) {
    e.preventDefault();
}

function handleKeyboard(e) {
    console.info(`Keydown | ${e.code}`);
    if (focusedCell !== null) {
        switch (e.code) {
            case "ArrowLeft":
            case "ArrowRight":
            case "ArrowUp":
            case "ArrowDown":
                var dir = direction[e.code];
                var newFocusedCell = focusedCell.move(dir);
                if (withinMap(newFocusedCell)) {
                    addCommand(focusedType, focusedCell, dir);
                    switch (focusedType) {
                        case "Click":
                        case "DoubleClick":
                            focusedCell = newFocusedCell;
                            focusedType = "Click";
                            break;
                        case "RightClick":
                            focusedCell = null;
                            focusedType = null;
                            break;
                        default:
                            console.warn('Error | handleKeyboard | Impossible to reach');
                    }
                }
                break;
            case "KeyQ":
                inputDeque.reset();
                focusedCell = null;
                focusedType = null;
                break;
            case "KeyE":
                inputDeque.pull();
                focusedCell = null;
                focusedType = null;
                break;
        }
    }
}

function withinMap(point) {
    return 0 <= point.x && point.x < Constants.MAP_SIZE && 0 <= point.y && point.y < Constants.MAP_SIZE
}

function distanceBetweenCells(fromCell, toCell) {
    return Math.abs(toCell.x - fromCell.x) + Math.abs(toCell.y - fromCell.y)
}

function directionBetweenCells(fromCell, toCell) {
    return toCell.move(fromCell.negative());
}

function addCommand(type, focus, dir) {
    var command = {
        type: type,
        focus: focus.toObject(),
        dir: dir.toObject()
    }
    inputDeque.push(command);
    console.info(`Command | ${type} ${focus} ${dir}`);
}