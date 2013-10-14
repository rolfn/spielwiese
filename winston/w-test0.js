#!/usr/bin/env node

console.log('###########################################');

var winston = require('winston');

/// winston.remove(winston.transports.Console);

var customLevels = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
};

function getLogger() {
  var logger = new (winston.Logger)({
    'transports': [
    new (winston.transports.Console)(
    {
      'level': 'enter',
      'colorize': true
    })
    ]
  });

  logger.setLevels(customLevels.levels);
  winston.addColors(customLevels.colors);

  return logger;
}

var logger = getLogger();

logger.info('this is some info');
logger.debug('a debug message');

var host = 'localhost', port = 9001;

logger.log('listening on ' + host + ':' + port); // old
logger.log('listening', { host: host, port: port }); // new

console.log('###########################################');

