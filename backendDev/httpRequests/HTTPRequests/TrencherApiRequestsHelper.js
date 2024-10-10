import { handleError } from '../TrencherErrors'


let baseURL = process.env.API_BASE_URL || ''

/**
 * Module for making HTTP Requests easily. It supports and manages
 * entities with one or more pdf files and/or images. 
 * THIS METHODS ALSO WORK WITH VUE and SVELTE PROJECTS!
 * @module TrencherReactApiRequestsHelper
 * @fileoverview This module contains functions for making clasic HTTP Requests.
 * @author Daniel Galván Cancio
*/


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
 * Creates the full url for fetch requests.
 * @param {string} baseurl - The base URL.
 * @param {string} route - The specific part of the URL.
 * @returns {string} - The full url built in order to make
 * the fetch request 
 * @author Daniel Galván Cancio
*/
function buildFullUrl(baseurl, route) {
  let res = ''
  if(baseurl !== undefined && baseurl !== null){

    if(!baseURL.endsWith('/')) {
      baseURL += '/';
    }
    if(route.startsWith('/')) {
      route = route.substring(1);
    }
    res = baseURL + route;
  } else {
    if(route.startsWith('/')) {
      route = route.substring(1)
    } 
    res =  '/' + route
  }
  return res
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
    const fullURL = buildFullUrl(baseURL, route)
    const response = await fetch(fullURL)
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
    const fullURL = buildFullUrl(baseURL, route)
    const response = await fetch(fullURL, {
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
    const fullURL = buildFullUrl(baseURL, route)
    const response = await fetch(fullURL, {
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
    const fullURL = buildFullUrl(baseURL, route)
    const response = await fetch(fullURL, {
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
    const fullURL = buildFullUrl(baseURL, route)
    const response = await fetch(fullURL, {
      method: 'DELETE',
    })
    return await response.json()
  } catch (error) {
    handleError(error,customErrorHandler)
  }
}

export { get, post, put, patch, destroy, setFetchBaseURL }
