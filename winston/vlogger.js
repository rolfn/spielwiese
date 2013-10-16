var winston = require('winston');
var path = require('path');
var moment = require('moment');
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

var logger = new (winston.Logger)();
var _transports = {};

function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

logger.add = function (_o, _c) {
  var c = _c ? _c : {};
  var o = typeof _o === 'object' ? _o : new (winston.transports.Console)(c);
  o.timestamp = timestamp;
  _transports[o.name] = o;
  winston.Logger.prototype.add.call(this, o, {}, true);
}

logger.remove = function(o) {
  delete _transports[o.name];
  winston.Logger.prototype.remove.call(this, o);
}

logger.log = function() {
  var parent = stackTrace.get()[1].getMethodName();
  var trace = parent ? stackTrace.get()[2] : stackTrace.get()[1];
  var file = path.basename(trace.getFileName());
  var line = trace.getLineNumber();
  var func = trace.getFunctionName() ? ':' + trace.getFunctionName() : '';
  for (var i in logger.transports) {
    logger.transports[i].label = file + ':' + line + func;
  }
  winston.Logger.prototype.log.apply(this, arguments);
}

logger.enable = function() {
  for (var name in _transports) {
    winston.Logger.prototype.add.call(this, _transports[name], {}, true);
  }
}

logger.disable = function () {
  for (var name in this.transports) {
    winston.Logger.prototype.remove.call(this, { name: name });
  }
};

module.exports = logger;
