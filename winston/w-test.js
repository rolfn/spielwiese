#!/usr/bin/env node

console.log('###########################################');

var winston = require('winston');
var Path = require('path');
var inspect = require('util').inspect;
var moment = require('moment');
/// winston.remove(winston.transports.Console);
var stackTrace = require('stack-trace');

var level_cfg = {
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

var myConsole = new (winston.transports.Console)({
  level: 'debug',
  json : false,
  timestamp : function() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  },
  handleExceptions: true,
  colorize: true,
  prettyPrint: true
});

var logger = new (winston.Logger)({
  levels: level_cfg.levels,
  colors: level_cfg.colors,
});

logger.add(myConsole, {}, true);

logger.log = function() {
  var parentMethod = stackTrace.get()[1].getMethodName();
  var trace = parentMethod ? stackTrace.get()[2] : stackTrace.get()[1];
  var file = Path.basename(trace.getFileName());
  var line = trace.getLineNumber();
  var func = trace.getFunctionName() ? ':' + trace.getFunctionName() : '';
  for (var i in logger.transports) {
    logger.transports[i].label = file + ':' + line + func;
  }
  winston.Logger.prototype.log.apply(this, arguments);
}

///console.log(inspect(logger));
console.log('XXX: ' + typeof winston.transports.Console);
console.log('XXX: ' + typeof myConsole);

logger.log('info', 'Hello distributed log files!',
  { anything: 'This is metadata' });
logger.info('Das ist ein "%s"', 'String');
logger.debug('DEGUG');
logger.warn('WARN');
logger.error('ERROR');

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

fridolin1();
fridolin2();

logger.info('GUSTAV');

//logger.remove(myConsole);
logger.clear();

logger.info('HUGO 1');

logger.add(myConsole, {}, true);

logger.info('HUGO 2');

console.log('###########################################');

