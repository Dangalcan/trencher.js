import { handleError } from '../TrencherErrors'

/**
 * Module for making HTTP Requests easily. It supports and manages
 * entities with one or more pdf files and/or images.
 * @module TrencherReactApiRequestsHelper
 * @fileoverview This module contains functions for making clasic HTTP Requests.
 * @author Daniel Galván Cancio
*/


let baseURL = process.env.API_BASE_URL || ''

/**
 * Sets the base URL for fetch requests.
 * @param {string} newBaseURL - The base URL to be set.
 * @example
 * setFetchBaseURL('https://api.example.com')
 * @returns {void}
 * @author Daniel Galván Cancio
*/
function setFetchBaseURL(newBaseURL) {
  baseURL = newBaseURL
}

/**
 * Executes a GET request using fetch. You can decide how to manage any errors
 * thrown with customErrorHandler.
 * @param {string} route - The route or URL to fetch data from.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
*/
const get = async (route, customErrorHandler = null) => {
  try {
    const response = await fetch(`${baseURL}${route}`)
    return await response.json()
  } catch (error) {
    handleError(error,customErrorHandler)
  }
}

/**
 * Executes a POST request using fetch. You can decide how to manage any errors
 * thrown with customErrorHandler. The function also manages entities with one or 
 * more pdf files and/or images.
 * @param {string} route - The route or URL to post data to.
 * @param {object} [data=null] - The data to send in the body of the request.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
*/
const post = async (route, data = null, customErrorHandler = null) => {
  try {
    const response = await fetch(`${baseURL}${route}`, {
      method: 'POST',
      body: data
    })
    return await response.json()
  } catch (error) {
    handleError(error,customErrorHandler)
  }
}

/**
 * Executes a PUT request using fetch. You can decide how to manage any errors
 * thrown with customErrorHandler. The function also manages entities with one or 
 * more pdf files and/or images.
 * @param {string} route - The route or URL to put data to.
 * @param {object} [data=null] - The data to send in the body of the request.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
*/
const put = async (route, data = null, customErrorHandler = null) => {
  try {
    const response = await fetch(`${baseURL}${route}`, {
      method: 'PUT',
      body: data,
    })
    return await response.json()
  } catch (error) {
    handleError(error,customErrorHandler)
  }
}

/**
 * Executes a PATCH request using fetch. You can decide how to manage any errors
 * thrown with customErrorHandler. The function also manages entities with one or 
 * more pdf files and/or images.
 * @param {string} route - The route or URL to patch data to.
 * @param {object} [data=null] - The data to send in the body of the request.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
*/
const patch = async (route, data = null, customErrorHandler = null) => {
  try {
    const response = await fetch(`${baseURL}${route}`, {
      method: 'PATCH',
      body: data,
    })
    return await response.json()
  } catch (error) {
    handleError(error,customErrorHandler)
  }
}

/**
 * Executes a DELETE request using fetch. You can decide how to manage any errors
 * thrown with customErrorHandler.
 * @param {string} route - The route or URL to delete data from.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
*/
const destroy = async (route, customErrorHandler = null) => {
  try {
    const response = await fetch(`${baseURL}${route}`, {
      method: 'DELETE',
    })
    return await response.json()
  } catch (error) {
    handleError(error,customErrorHandler)
  }
}

export { get, post, put, patch, destroy, setFetchBaseURL }
