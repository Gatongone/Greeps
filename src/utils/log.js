import { YELLOW, BLUE, RED, GREEN } from "./definition"
export const log = {};
log.spawns = function () {
    console.log("[Log] Spawns:")
    var index = 0;
    for (var name in Game.spawns) {
        console.log("- " + name);
        index++;
    }
    return "count : " + index;
};

log.creeps = function () {
    console.log("[Log] Spawns:")
    var index = 0;
    for (var name in Game.creeps) {
        console.log("- " + name);
        index++;
    }
    return "count : " + index;
};

log.color = function (color, msg) {
    console.log("<text style=\"color: " + color + "\">" + msg + "</text>");
};

log.info = function (msg) {
    console.log(msg);
};

log.error = function (msg) {
    log.color(RED, msg);
};

log.warn = function (msg) {
    log.color(YELLOW, msg);
};

log.action = function (msg) {
    log.color(BLUE, msg);
};

log.success = function (msg) {
    log.color(GREEN, msg);
};