import { coroutine } from "./coroutine"
import { DEFAULT_SPAWN, ROLE } from "./definition"
import { log } from "./log"

export const action = {};
action.spawn = {};
action.cache = {};
action.cache.harvester = {};

const spawnCheck = function (spawnName) {
    if (!Game.spawns[spawnName]) {
        log.error("[Error] Spawn undefine. Spawn : " + spawnName);
        return false;
    }
    return true;
};

action.spawn.creep = function (spawnName, creepName, bodys) {
    if (spawnName == undefined) spawnName = DEFAULT_SPAWN.name;
    var success = spawnCheck(spawnName);
    if (!success) return "";

    var roleName = creepName;
    if (!Game.creeps[creepName]) {
        if (!Game.spawns[spawnName].memory.creepId)
            Game.spawns[spawnName].memory.creepId = 0;
        creepName += "_" + ++Game.spawns[spawnName].memory.creepId;
    }
    success = Game.spawns[spawnName].spawnCreep(bodys, creepName, { memory: { role: roleName } });

    if (success >= 0) {
        log.action("[Factory] Creating creep...")
        coroutine.register(
            function () { log.success("[Factory] Creep created : " + creepName) },
            function () { return Game.spawns[spawnName] != undefined && Game.spawns[spawnName].spawning == null },
        );
    }
    else {
        switch (success) {
            case ERR_NOT_ENOUGH_ENERGY: log.error("[Error] Energy deficiency. Spawn : " + spawnName); break;
            case ERR_BUSY: log.error("[Warning] Spawn is busy. Spawns : " + spawnName); break;
            case ERR_NAME_EXISTS: log.error("[Warning] Creep exists. Creeps : " + creepName); break;
            case ERR_INVALID_ARGS: log.error("[Warning] Args invalid. "); break;
        }
    }
    return success;
}

action.spawn.harvester = function (spawnName) {
    return action.spawn.creep(spawnName, ROLE.Harvester.name, ROLE.Harvester.body);
}

action.spawn.upgrader = function (spawnName) {
    return action.spawn.creep(spawnName, ROLE.Upgrader.name, ROLE.Upgrader.body);
}

action.spawn.builder = function (spawnName) {
    return action.spawn.creep(spawnName, ROLE.Builder.name, ROLE.Builder.body);
}