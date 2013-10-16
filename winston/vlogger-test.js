#!/usr/bin/env node

/**
 * @author Rolf Niepraschk (Rolf.Niepraschk@gmx.de)
 */

var winston = require('winston');
var logger = require('./vlogger');

// TODO: transport" "vWebsocket"

logger.add(winston.transports.Console, {
  level: 'debug',
  handleExceptions: true,
  colorize: true,
  prettyPrint: true
});

function function1() {
  logger.info('FRIDOLIN %s', 'XXX');
  logger.log('info', 'FRIDOLIN %s', 'YYY');
}

function function2() {
  function function2_1() {
    logger.info('FRIDOLIN %s', 'UUU');
    logger.log('info', 'FRIDOLIN %s', 'VVV');
  }
  function2_1();
}

console.log('###########################################');

logger.info('INFO');
logger.debug('DEGUG');
logger.warn('WARN');
logger.error('ERROR');

function1();
function2();

logger.warn('disable logger');
logger.disable();
logger.info('HUGO 1');
logger.enable();
logger.warn('enable  logger');
logger.info('HUGO 2');

console.log('###########################################');
