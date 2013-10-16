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

function fridolin1() {
  logger.info('FRIDOLIN %s', 'XXX');
  logger.log('info', 'FRIDOLIN %s', 'YYY');
}

function fridolin2() {
  function fridolin3() {
    logger.info('FRIDOLIN %s', 'UUU');
    logger.log('info', 'FRIDOLIN %s', 'VVV');
  }
  fridolin3();
}

console.log('###########################################');

logger.info('INFO');
logger.debug('DEGUG');
logger.warn('WARN');
logger.error('ERROR');

fridolin1();
fridolin2();

logger.info('GUSTAV');
logger.disable();
logger.info('HUGO 1');
logger.enable();
logger.info('HUGO 2');

console.log('###########################################');
