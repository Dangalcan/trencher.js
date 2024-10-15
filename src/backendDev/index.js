/**
 * Module for making easier your middlewares chain system.
 * @module TrencherValidationHandlingMiddleware
 * @fileoverview This module contains usefull middlewares that you can implement in your routing.
 * @author Daniel Galván Cancio
 */
const TrencherMiddlewares = require("./middlewares/TrencherValidationHandlingMiddleware");

/**
 * Module for making easier your routing system.
 * @module TrencherRoutesHelper
 * @fileoverview This module contains functions for routing your database in an easy
 * and standarized way.
 * @author Daniel Galván Cancio
 */
const TrencherRoutesHelper = require("./routing/TrencherRoutesHelper")

module.exports = {
    TrencherMiddlewares,
    TrencherRoutesHelper
}