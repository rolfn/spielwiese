#!/usr/bin/env node

console.log('###########################################');

var winston = require('winston');
var Path = require('path');
var inspect = require('util').inspect;
var moment = require('moment');
/// winston.remove(winston.transports.Console);
var stackTrace = require('stack-trace');

var config = {
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
  levels: config.levels,
  json : false,
  timestamp : function() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  },
  label: "HUGO", // function?!
  handleExceptions: true,
  colorize: true,
});

var logger = new (winston.Logger)({
    level: 'debug',
    levels: config.levels,
    colors: config.colors,
    transports: [
      myConsole
    ],
  });

//winston.addColors(config.colors);

logger.stream({ start: -1 }).on('log', function(log) {
  console.log('\n\n\n+++++++++++++++' + log);
});

logger.log('info', 'Hello distributed log files!',
  { anything: 'This is metadata' });
logger.info('Das ist ein "%s"', 'String');
logger.debug('DEGUG');
logger.warn('WARN');
logger.error('ERROR');

/*
logger.log = function() {
  var args = arguments;
  if(args[2]) args[3] = args[2];
  args[2] = {
    "foo" : "bar"
  }
  winston.Logger.prototype.log.apply(this,args);
}
* */

myLog = function() {
  var trace = stackTrace.get()[2];
  var file = Path.basename(trace.getFileName());
  var line = trace.getLineNumber();
  var method = trace.getFunctionName() ? ':' + trace.getFunctionName() : '';
  for (var i in logger.transports) {
    logger.transports[i].label = file + ':' + line + method;
  }
  winston.Logger.prototype.log.apply(this, arguments);
}

logger.log = myLog;

/*

dummy-Logger!?


*/

function fridolin() {
  logger.info('FRIDOLIN %s', 'XXX');
}

fridolin();

logger.info('GUSTAV');

//logger.remove(winston.transports.Console);

// logger.remove(myConsole);

logger.log = function() {}; //?

logger.info('HUGO 1');

//logger.add(myConsole);

logger.log = myLog;

logger.info('HUGO 2');

console.log('###########################################');

