/**
 * Module for logging the app (Its based on winston).
 * @module TrencherLogger
 * @fileoverview This module contains the library logger.
 * @author Daniel Galván Cancio
 */
const logger = require('./TrencherLogger.js')

/**
 * Module for encripting and decripting based on node-forge
 * @module TrencherEncripter
 * @fileoverview This module contains function to encript and decript objects.
 * @author Daniel Galván Cancio
 */
const Encripter = require('./encripter.js')

module.exports = {
    logger,
    Encripter
}