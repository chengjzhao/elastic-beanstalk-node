'use strict';
const { createLogger, format, transports } = require('winston');
const levels = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 };
const logLevel = process.env.LOG_LEVEL || 'debug';
const outputs = [];

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info, opts) => {
  if (info.private === true) { return false; }
  return info;
});

if (levels[logLevel] <= 2) {
  outputs.push(new transports.Console({
    format: format.combine(
      ignorePrivate(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} [${info.level}] ${info.message}`)
    ),
  }));
} else {
  outputs.push(new transports.Console({
    format: format.combine(
      ignorePrivate(),
      format.colorize(),
      format.simple(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} [${info.level}] ${info.message}`)
    ),
  }));
}
const logger = createLogger({
  level: logLevel,
  format: format.simple(),
  transports: outputs
});

module.exports = logger;