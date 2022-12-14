import { coroutine } from "./coroutine"
import { log } from "./log"
import { action } from "./action"

export const utils = {};
global.utils = utils;

utils.coroutine = coroutine;
utils.log = log;
utils.action = action;