/**
 * @author Rolf Niepraschk (Rolf.Niepraschk@gmx.de)
 */

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

function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

var logger, disabled = false;

var getLogger = function(_cfg) {

  if (logger) return logger;

  var cfg = _cfg || {};

  var tr;

  if (cfg.transports && cfg.transports.length) {
    tr = cfg.transports.slice(0);
    delete cfg.transports;
  }

  logger = new (winston.Logger)(cfg);

  logger.add = function (_o, _c) {
    var c = _c ? _c : {};
    var o = typeof _o === 'object' ? _o : new _o(c);
    // our own timestamp format for every added transport
    o.timestamp = timestamp;
    winston.Logger.prototype.add.call(this, o, {}, true);
  }

  logger.log = function() {
    if (disabled) return;
    var parent = stackTrace.get()[1].getMethodName();
    var trace = parent ? stackTrace.get()[2] : stackTrace.get()[1];
    var file = path.basename(trace.getFileName());
    var line = trace.getLineNumber();
    var func = trace.getFunctionName() ? ':' + trace.getFunctionName() : '';
    // Label -> file name:line number:function name
    for (var name in this.transports) {
      this.transports[name].label = file + ':' + line + func;
    }
    winston.Logger.prototype.log.apply(this, arguments);
  }

  logger.enable = function() {
    disabled = false;
  }

  logger.disable = function () {
    disabled = true;
  }

  if (tr) {
    for (var i=0; i<tr.length; i++) {
      logger.add(tr[i]);
    }
  }

  return logger;

}

module.exports = getLogger;
