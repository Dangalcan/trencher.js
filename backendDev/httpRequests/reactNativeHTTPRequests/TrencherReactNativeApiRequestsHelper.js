import axios from 'axios'
import { handleError } from '../TrencherErrors'
import { prepareData } from './TrencherReactNativeFileUploadHelper'

/**
 * Module for making HTTP Requests easily. It supports and manages
 * entities with one or more pdf files and/or images.
 * @module TrencherReactNativeApiRequestsHelper
 * @fileoverview This module contains functions for making clasic HTTP Requests.
 * @author Daniel Galván Cancio
 */

axios.defaults.baseURL = process.env.API_BASE_URL

/**
 * Sets the base URL for Axios requests.
 * @param {string} baseURL - The base URL to be set.
 * @example
 * setAxiosBaseURL('https://api.example.com')
 * @returns {void}
 * @author Daniel Galván Cancio
 */
function setAxiosBaseURL (baseURL) {
  axios.defaults.baseURL = baseURL
}

/**
 * Executes a GET request using Axios. You can decide how to manage any errors
 * thrown with customErrorHandler.
 * @param {string} route - The route or URL to fetch data from.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
 */
const get = (route, customErrorHandler = null) => {
  return new Promise(function (resolve, reject) {
    axios.get(route)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(error => {
        try {
          handleError(error,customErrorHandler)
        } catch (error) {
          reject(error)
        }
      })
  })
}

/**
 * Executes a POST request using Axios.  You can decide how to manage any errors
 * thrown with customErrorHandler. The function also manages entities with one or 
 * more pdf files and/or images
 * @param {string} route - The route or URL to fetch data from.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
 */
const post = (route, data = null, customErrorHandler = null) => {
  const { config, preparedData } = prepareData(data)

  return new Promise(function (resolve, reject) {
    axios.post(route, preparedData, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        try {
          handleError(error,customErrorHandler)
        } catch (error) {
          reject(error)
        }
      })
  })
}

/**
 * Executes a PUT request using Axios.  You can decide how to manage any errors
 * thrown with customErrorHandler. The function also manages entities with one or 
 * more pdf files and/or images
 * @param {string} route - The route or URL to fetch data from.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
 */
const put = (route, data = null, customErrorHandler = null) => {
  const { config, preparedData } = prepareData(data)

  return new Promise(function (resolve, reject) {
    axios.put(route, preparedData, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        try {
          handleError(error,customErrorHandler)
        } catch (error) {
          reject(error)
        }
      })
  })
}

/**
 * Executes a PATCH request using Axios.  You can decide how to manage any errors
 * thrown with customErrorHandler. The function also manages entities with one or 
 * more pdf files and/or images
 * @param {string} route - The route or URL to fetch data from.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
 */
const patch = (route, data = null, customErrorHandler = null) => {
  const { config, preparedData } = prepareData(data)

  return new Promise(function (resolve, reject) {
    axios.patch(route, preparedData, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        try {
          handleError(error,customErrorHandler)
        } catch (error) {
          reject(error)
        }
      })
  })
}

/**
 * Executes a DELETE request using Axios. You can decide how to manage any errors
 * thrown with customErrorHandler.
 * @param {string} route - The route or URL to fetch data from.
 * @param {function} [customErrorHandler=null] - Optional custom error handler function.
 * @returns {Promise<any>} - A Promise that resolves with the response data if successful, or rejects with an error.
 * @author Daniel Galván Cancio
 */
const destroy = (route, customErrorHandler = null) => {
  return new Promise(function (resolve, reject) {
    axios.delete(route)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        try {
          handleError(error,customErrorHandler)
        } catch (error) {
          reject(error)
        }
      })
  })
}

export { get, post, put, destroy, patch, setAxiosBaseURL }
