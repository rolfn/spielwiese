#!/usr/bin/env node

/**
 * @author Rolf Niepraschk (Rolf.Niepraschk@gmx.de)
 */

var winston = require('winston');

// TODO: transport "vWebsocket"


var logger = require('./vlogger')({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true,
      prettyPrint: true
    })
  ]
});

logger.add(winston.transports.File, {
  level: 'warn',
  handleExceptions: true,
  filename: './vlogger-test.log',
  prettyPrint: true,
  json: false
});

function function1() {
  function function1_1() {
    logger.info('FRIDOLIN %s', 'UUU');
    logger.log('info', 'FRIDOLIN %s', 'VVV');
  }
  function1_1();
}

console.log('###########################################');

logger.info('INFO');
logger.debug('DEGUG');
logger.warn('WARN');
logger.error('ERROR');

function1();

logger.warn('disable logger');
logger.enable(false);
logger.info('HUGO 1');
logger.enable(true);
logger.warn('enable  logger');
logger.info('HUGO 2');

console.log('###########################################');
