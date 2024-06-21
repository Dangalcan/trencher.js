import { Platform } from 'react-native'
import { InternalTrencherError } from '../TrencherErrors'
import * as mime from 'react-native-mime-types'

/**
 * Module for managing pdf files and images on entities.
 * @module TrencherReactNativeFileUploadHelper
 * @fileoverview This module contains functions for working with entities 
 * which have images and/or pdf files on them.
 * @author Daniel Galván Cancio
*/


/**
 * Normalizes an image file object based on the platform.
 * For web platform, converts a URI into a Blob and then into a File object.
 * For React Native platform, prepares the file object with necessary properties.
 * @param {Object} file - The image file object containing URI.
 * @returns {File | Object} - Normalized image file object suitable for platform.
 * @author Daniel Galván Cancio 
*/
const normalizeImageFile = (file) => {
  if (Platform.OS === 'web') {
    // Para plataforma web
    const fileName = file.uri.split('/').pop()
    const imageType = file.uri.split(',')[0].split(':')[1].split(';')[0]
    const byteString = atob(file.uri.split(',')[1])
    const ab = new ArrayBuffer(byteString.length)
    const arr = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      arr[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([arr], { type: imageType })

    return new File([blob], `${fileName}.${mime.extension(imageType)}`, {
      type: imageType
    })
  } else {
    // Para React Native
    const fileType = mime.lookup(file.uri) || 'application/octet-stream'
    const fileName = file.uri.split('/').pop()
    const uri = Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri

    return {
      uri,
      type: fileType,
      name: fileName
    }
  }
}

/**
 * Receives an object and returns it without file objects.
 * @param {Object} dataWithFiles - The object you want to take files out.
 * @returns {Object} - The same object but without files.
 * @author Daniel Galván Cancio 
*/
const getDataWithoutBodyFiles = (dataWithFiles) => {
  const data = { ...dataWithFiles }
  Object.keys(data).filter(key => data[key] && data[key].assets).forEach(key => delete data[key])
  return data
}

/**
 * Receives an object and returns an array with its files.
 * @param {Object} data - The object containing the files you want.
 * @returns {Array} - An array of objects representing files with additional `paramName` property.
 * @author Daniel Galván Cancio 
*/
const getFilesFromData = (data) => {
  return Object.keys(data).filter(key => data[key] && data[key].assets && data[key].assets[0] && data[key].assets[0].uri).map(key => { // data[key].height para ver si viene del image picker
    data[key].paramName = key
    return data[key]
  })
}

/**
 * Prepares image properties of an entity by formatting URIs into asset objects.
 * @param {Object} entity - The entity object containing image properties to be prepared.
 * @param {Array<string>} imagePropertyNames - Array of property names in `entity` that contain image URIs.
 * @returns {Object} - A copy of the `entity` object with image properties formatted as asset objects.
 * @author Daniel Galván Cancio 
*/
const prepareEntityImages = (entity, imagePropertyNames) => {
  const entityCopy = { ...entity }
  imagePropertyNames.forEach(imagePropertyName => {
    if (entityCopy[imagePropertyName]) {
      entityCopy[imagePropertyName] = { assets: [{ uri: `${process.env.API_BASE_URL}/${entityCopy[imagePropertyName]}` }] }
    }
  })
  return entityCopy
}

/**
 * Converts a Base64 string into a Blob object with specified MIME type.
 * @param {string} base64 - The Base64 string to convert into Blob.
 * @param {string} type - The MIME type of the Blob (e.g., 'image/jpeg', 'application/pdf').
 * @returns {Blob} - Blob object representing the converted binary data.
 * @author Daniel Galván Cancio   
*/
const base64ToBlob = (base64, type) => {
  const byteCharacters = atob(base64)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  return new Blob(byteArrays, { type })
}

/**
 * Normalizes a PDF file object based on the platform.
 * For web platform, converts a PDF URI or Blob into a File object with specified MIME type.
 * For React Native platform, prepares the PDF file object with necessary properties.
 * @param {Object | Blob | File} file - The PDF file object or Blob to be normalized.
 * @param {string} [paramName] - Optional parameter name to use as the file name for web platform.
 * @returns {File | Object} - Normalized PDF file object suitable for platform.
 * @throws {InternalTrencherError} - Throws an error if the file format is not supported.
 * @author Daniel Galván Cancio  
*/
const normalizePDFFile = (file, paramName) => {
  if (Platform.OS === 'web') {
    const fileType = file.mimeType || file.type || 'application/pdf'
    let blob

    if (file.uri.startsWith('data:')) {
      // Decode base64 URI to Blob
      const base64 = file.uri.split(',')[1]
      blob = base64ToBlob(base64, fileType)
    } else if (file instanceof Blob || file instanceof File) {
      blob = file
    } else {
      throw new InternalTrencherError('This file format is not supported by PDF.')
    }
    const fileName = file.name || paramName || 'unnamed.pdf'
    return new File([blob], fileName, { type: fileType })
  } else {
    const fileType = mime.lookup(file.uri) || 'application/pdf'
    return {
      name: file.uri.split('/').pop(),
      type: fileType,
      uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri
    }
  }
}

/**
 * Constructs a FormData object for uploading files and additional data.
 * Normalizes files before appending to FormData based on their type.
 * @param {Array<Object>} files - Array of file objects containing assets to be uploaded.
 * @param {Object} dataWithoutFiles - Object containing additional data to be appended to FormData.
 * @returns {FormData} - FormData object ready for HTTP file upload.
 * @author Daniel Galván Cancio  
*/
function constructFormData (files, dataWithoutFiles) {
  const formData = new FormData()
  files.forEach(file => {
    const asset = file.assets ? file.assets[0] : file
    if (asset.mimeType === 'application/pdf' || mime.lookup(asset.uri) === 'application/pdf') {
      const normalizedpdf = normalizePDFFile(asset, file.paramName)
      formData.append(file.paramName, normalizedpdf)
    } else {
      const normalizedFile = normalizeImageFile(asset)
      formData.append(file.paramName, normalizedFile)
    }
  })
  Object.keys(dataWithoutFiles).forEach((key) => {
    if (dataWithoutFiles[key] !== null) {
      formData.append(key, dataWithoutFiles[key])
    }
  })
  return formData
}

/**
 * Returns headers object for making a multipart/form-data HTTP request.
 * @returns {Object} - Headers object with 'Content-Type' set to 'multipart/form-data'.
 * @example
 * @author Daniel Galván Cancio  
*/
function getMultiPartHeader () {
  return {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
}

/**
 * Prepares data for HTTP requests by converting prepared data into FormData
 * and setting multipart/form-data headers.
 * @param {Object} preparedData - The data object to be prepared for HTTP request.
 * @returns {Object} - Object containing FormData and multipart/form-data headers.
 * @author Daniel Galván Cancio  
 */
function prepareData (preparedData) {
  const files = getFilesFromData(preparedData)
  const dataWithoutFiles = getDataWithoutBodyFiles(preparedData)
  let formData
  if (files && files.length) {
    formData = constructFormData(files, dataWithoutFiles)
  } else {
    formData = new FormData()
    Object.keys(dataWithoutFiles).forEach(key => formData.append(key, dataWithoutFiles[key]))
  }
  const config = getMultiPartHeader()
  return { config, preparedData: formData }
}

export { normalizeImageFile, getDataWithoutBodyFiles, getFilesFromData, constructFormData, getMultiPartHeader, prepareData, prepareEntityImages }
