const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('dotenv').config();

/**
 * Module for logging the app (Its based on winston).
 * @module TrencherLogger
 * @fileoverview This module contains the library logger.
 * @author Daniel Galván Cancio
 */

const levelColors = {
  info: '\x1b[34m', // Blue
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
  debug: '\x1b[32m', // Green
  verbose: '\x1b[38;2;161;74;189m', // Purple
  silly: '\x1b[35m', // Magenta
};

const resetColor = '\x1b[0m';

const logFormat = printf(({ level, message, timestamp }) => {
  const logLevelColor = levelColors[level];
  const formattedTimestamp = new Date(timestamp).toLocaleString();
  return `${formattedTimestamp} [${logLevelColor}${level.toUpperCase()}${resetColor}]: ${message}`;
});

/**
 * App logger based on winston.
 *
 * Log level can be stablished in the .env file with variable 'LOG_LEVEL'
 * Default log level is info
 *
 * You can call logger importing it as a const variable.
 * In order to use logger, you must do as follows:
 *
 * LogLevel can be: error > warn >  info > verbose > debug > silly
 * logger.LogLevel('Your log text here')
 *
 * Example:
 *
 * logger.info('This is my first log :3')
 *
 */
const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: combine(timestamp(), logFormat),
  transports: [new transports.Console()],
});

module.exports = logger;
