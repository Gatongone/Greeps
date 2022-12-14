import { harvester } from "./harvester"
import { upgrader } from "./upgrader"
import { builder } from "./builder"
import { ROLE } from "../utils/definition"


export const role =
{
    update: function (creep) {
        switch (creep.memory.role) {
            case ROLE.Harvester.name: harvester.update(creep); break;
            case ROLE.Upgrader.name: upgrader.update(creep); break;
            case ROLE.Builder.name: builder.update(creep); break;
        }
    }
}