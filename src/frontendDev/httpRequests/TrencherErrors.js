const logger = require('../../tools/TrencherLogger.js');

/**
 * Module for managing and defining errors.
 * @module TrencherErrors
 * @fileoverview This module contains classes to manage errors.
 * @author Daniel Galván Cancio
 */

/**
 * Main error class of errors in Trencher.
 * @extends Error
 * @author Daniel Galván Cancio
 */
class TrencherError extends Error {
  /**
   * Creates an instance of TrencherError.
   * @param {string} [message='Trencher error'] - Error message.
   * @param {any} [code] - Error code. Usually is a number.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   * @throws {Error} - It throws an error in case additionalProperties is not an object.
   */
  constructor(message = 'Trencher error', code, additionalProperties = {}) {
    if (
      typeof additionalProperties !== 'object' ||
      Array.isArray(additionalProperties)
    ) {
      throw new Error('Additional Properties must be an object.');
    }
    super(message);
    this.code = code;
    this.additionalProperties = additionalProperties;
  }

  /**
   * Adds a property to the additionalProperties object.
   * @param {string} key - The key of the property to add.
   * @param {any} value - The value of the property to add.
   */
  addProperty(key, value) {
    this.additionalProperties[key] = value;
  }

  /**
   * Removes a property from the additionalProperties object.
   * @param {string} key - The key of the property to remove.
   */
  removeProperty(key) {
    if (this.additionalProperties.hasOwnProperty(key)) {
      delete this.additionalProperties[key];
    }
  }

  /**
   * Returns the additionalProperties object.
   * @returns {Object} The additionalProperties object.
   */
  getAdditionalProperties() {
    return this.additionalProperties;
  }

  /**
   * Checks if the additionalProperties object has any properties.
   * @returns {boolean} True if the additionalProperties object has properties, false otherwise.
   */
  hasAdditionalProperties() {
    return Object.keys(this.additionalProperties).length > 0;
  }
}

/**
 * A class to define common internal server error (500).
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class InternalServerError extends TrencherError {
  /**
   * Creates an instance of InternalServerError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   */
  constructor(additionalProperties = {}) {
    super('Internal Server Error', 500, additionalProperties);
  }
}

/**
 * A class to define internal trencher library errors (500).
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class InternalTrencherError extends TrencherError {
  /**
   * Creates an instance of InternalTrencherError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   */
  constructor(additionalProperties = {}) {
    super('Internal Trencher Error', 500, additionalProperties);
  }
}

/**
 * A class to define errors in API calls.
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class ApiError extends TrencherError {
  /**
   * Creates an instance of ApiError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   * @param {any} [code] - Error code. Usually is a number.
   */
  constructor(code, additionalProperties = {}) {
    super('API error', code, additionalProperties);
  }
}

/**
 * A class to define clasis 404 error.
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class ResourceNotFoundError extends TrencherError {
  /**
   * Creates an instance of ResourceNotFoundError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   */
  constructor(additionalProperties = {}) {
    super('Resource not found', 404, additionalProperties);
  }
}

/**
 * A class to define clasic 403 error.
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class ForbbidenError extends TrencherError {
  /**
   * Creates an instance of ForbbidenError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   */
  constructor(additionalProperties = {}) {
    super('Forbiden', 403, additionalProperties);
  }
}

/**
 * A class to define an error that occurs when its not legally allowed (illegal) to provide the data requested.
 * Status code is 451
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class IllegalRequestError extends TrencherError {
  /**
   * Creates an instance of IllegalRequestError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   */
  constructor(additionalProperties = {}) {
    super('Unavailable for legal reasons', 451, additionalProperties);
  }
}

/**
 * This error was created as a joke in honor of my coworker Lucas Manuel Herencia Solís.
 * He's the best
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class xDError extends TrencherError {
  /**
   * Creates an instance of xDError.
   */
  constructor() {
    super('xD', 538);
  }
}

/**
 * A class to define an error in which usually the request is not well formed. Eg the body
 * has not enough parameters or they are not the needed
 * Status code is always 422
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class UnprocesableEntityError extends TrencherError {
  /**
   * Creates an instance of UnprocesableEntityError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   * @param {Object} [errors] - Usually an array of errors acumulated by the services
   * or the respective controller.
   */
  constructor(additionalProperties = {}, errors = []) {
    super('Unprocesable Entity', 422, additionalProperties);
    this.errors = errors;
  }
}

/**
 * A class to define an error in which usually the request is not rule compliant. Eg the
 * body does not allign with business rules or we are evaluating a form in frontend.
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class ValidationError extends TrencherError {
  /**
   * Creates an instance of ValidationError.
   * @param {any} [code] - Error code. Usually is a number.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   * @param {Object} [errors] - Usually an array of errors acumulated by the services
   * or the respective controller.
   */
  constructor(code, additionalProperties = {}, errors) {
    super('Validation Error', code, additionalProperties, errors);
  }
}

/**
 * A class to define problems with login.
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class LoginError extends TrencherError {
  /**
   * Creates an instance of LoginError.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   * @param {Object} [errors] - Usually an array of errors acumulated by the services
   * or the respective controller.
   */
  constructor(additionalProperties = {}, errors) {
    super('Invalid credentials', 401, additionalProperties);
    this.errors = errors;
  }
}

/**
 * A class to let you implement customs errors.
 * @extends TrencherError
 * @author Daniel Galván Cancio
 */
class CustomError extends TrencherError {
  /**
   * Creates an instance of CustomError.
   * @param {any} [code] - Error code. Usually is a number.
   * @param {Object} [additionalProperties={}] - Additional properties for the error.
   * @param {Object} [errors] - Usually an array of errors acumulated by the services
   * or the respective controller.
   */
  constructor(message, code, additionalProperties = {}) {
    super(message, code, additionalProperties);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}

/**
 * Logs the error details using a logger utility.
 * @param {TrencherError} error - The error to log.
 * @author Daniel Galván Cancio
 */
function printError(error) {
  const details = error.hasAdditionalProperties()
    ? `: ${JSON.stringify(error.additionalProperties)}`
    : '';
  const errors = error.errors ? `: ${JSON.stringify(error.errors)}` : '';
  logger.error(`${error.code} ${error.message}${details} ${errors}`);
}

/**
 * Handles the error by logging it and then either calling a custom error handler function (if provided) or re-throwing the error.
 * @param {TrencherError} error - The error to handle.
 * @param {function} [customErrorHandler=null] - An optional custom error handler function.
 * @throws {TrencherError} - Re-throws the error if no custom error handler is provided.
 * @author Daniel Galván Cancio
 */
async function handleError(error, customErrorHandler = null) {
  printError(error);
  if (customErrorHandler && typeof customErrorHandler === 'function') {
    await customErrorHandler(error);
    return;
  } else {
    throw error;
  }
}
module.exports = {
  InternalServerError,
  InternalTrencherError,
  ApiError,
  ValidationError,
  LoginError,
  ResourceNotFoundError,
  IllegalRequestError,
  xDError,
  UnprocesableEntityError,
  ForbbidenError,
  CustomError,
  handleError,
};
