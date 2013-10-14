#!/usr/bin/env node

console.log('###########################################');

var logger = require("lograp")();
logger.rootPath = __dirname;

logger.info("some text");

console.log('###########################################');

