import { utils } from "../utils/utils"
import { role } from "../role/role"

export const procedure = function () {
    utils.coroutine.reason();
    for (var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        if (creep.memory.role) {
            role.update(creep);
        }
    }
}