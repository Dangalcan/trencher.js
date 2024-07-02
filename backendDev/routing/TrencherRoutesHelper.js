'use strict'
const multer = require('multer')
const fs = require('fs')
const { handleValidation } = require('../middlewares/TrencherValidationHandlingMiddleware')
const path = require('path')

/**
 * Module for making easier your routing system.
 * @module TrencherRoutesHelper
 * @fileoverview This module contains functions for routing your database in an easy
 * and standarized way.
 * @author Daniel Galván Cancio
 */

/**
 * Configures multer in order to save entity's files.
 * @param {Object} options
 * @param {string} [folder = 'public/uploads'] - Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.
 * @param {Array<string>} [fileProperties = []] - A list of the names of the properties of the entity which are files
 * @returns {Function} Configured multer that its used in routes.
 * @author Daniel Galván Cancio 
*/
function configureMulter ({folder = 'public/uploads', fileProperties = [] }) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(folder, { recursive: true })
      cb(null, folder)
    },
    filename: function (req, file, cb) {
      cb(null, `${Math.random().toString(36).substring(7)}-${Date.now()}.${file.originalname.split('.').pop()}`)
    }
  })

  const uploadFields = fileProperties.length > 0 ? fileProperties.map(prop => ({ name: prop })) : []
  return multer({ storage }).fields(uploadFields)
}

/**
 * Creates a POST route for the resource
 * @param {Object} app - Application instance
 * @param {string} basePath - Base route to your resource. Eg: 'api/v4/users'
 * @param {Function} createMethod - Controller method used for creating the resource.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {Function} [validation] - Validation middleware, in order to ensure resource
 * consistency and/or business rules.
 * @param {Object} [multerOptions={}] - Multer options in order to configure multer.
 * MulterOptions properties must be folder (Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.) and 
 * fileProperties (A list of the names of the properties of the entity which are files)
 * @author Daniel Galván Cancio 
*/
function createRoute (app, basePath, createMethod, middlewares = [], validation, multerOptions = {}) {
  const upload = configureMulter(multerOptions)
  app.route(basePath)
    .post(
      ...middlewares,
      upload,
      validation || ((req, res, next) => next()),
      handleValidation,
      createMethod
    )
}

/**
 * Creates a simple GET route in order to get all resources. It  
 * DOES NOT SUPPORT paging and/or order.
 * @param {Object} app - Application instance
 * @param {string} basePath - Base route to your resource. 
 * Eg: 'api/v4/users'
 * @param {Function} getAllMethod - Controller method to get all resources.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @author Daniel Galván Cancio
*/
function getAllRoute (app, basePath, getAllMethod, middlewares = []) {
  app.route(basePath)
    .get(
      ...middlewares,
      getAllMethod
    )
}

/**
 * Creates a GET route in order to obtain an entity for its id.
 * @param {Object} app - Application instance
 * @param {string} basePath - Base route to your resource. Eg: 'api/v4/users'
 * @param {Function} getMethod - Controller method for obtaining a resource by its id.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @author Daniel Galván Cancio
*/
function getRoute (app, basePath, getMethod, middlewares = [], idPropertyName = 'id') {
  app.route(`${basePath}/:${idPropertyName}`)
    .get(
      ...middlewares,
      getMethod
    )
}

/**
 * Creates a PUT route in order to update a resource by its Id.
 * @param {Object} app - Application instance
 * @param {string} basePath - Base route to your resource. Eg: 'api/v4/users' 
 * @param {Function} updateMethod - Controller method for making the update.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {Function} [validation] - Validation middleware, in order to ensure resource
 * consistency and/or business rules.
 * @param {Object} [multerOptions={}] - Multer options in order to configure multer.
 * MulterOptions properties must be folder (Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.) and 
 * fileProperties (A list of the names of the properties of the entity which are files)
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @author Daniel Galván Cancio
*/
function updateRoute (app, basePath, updateMethod, middlewares = [], validation, multerOptions = {}, idPropertyName = 'id') {
  app.route(`${basePath}/:${idPropertyName}`)
    .put(
      ...middlewares,
      (req, res, next) => {
        const uploader = configureMulter(multerOptions)
        uploader(req, res, (err) => {
          if (err instanceof multer.MulterError || err) {
            return res.status(500).send(err.message)
          }
          next()
        })
      },
      validation || ((req, res, next) => next()),
      handleValidation,
      updateMethod
    )
}

/**
 * Creates a PATCH route in order to update a resource by its Id.
 * @param {Object} app - Application instance
 * @param {string} basePath - Base route to your resource. Eg: 'api/v4/users' 
 * @param {Function} updateMethod - Controller method for making the update.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {Function} [validation] - Validation middleware, in order to ensure resource
 * consistency and/or business rules.
 * @param {Object} [multerOptions={}] - Multer options in order to configure multer.
 * MulterOptions properties must be folder (Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.) and 
 * fileProperties (A list of the names of the properties of the entity which are files)
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @author Daniel Galván Cancio
*/
function patchRoute (app, basePath, updateMethod, middlewares = [], validation, multerOptions = {}, idPropertyName = 'id') {
  app.route(`${basePath}/:${idPropertyName}`)
    .patch(
      ...middlewares,
      (req, res, next) => {
        const uploader = configureMulter(multerOptions)
        uploader(req, res, (err) => {
          if (err instanceof multer.MulterError || err) {
            return res.status(500).send(err.message)
          }
          next()
        })
      },
      validation || ((req, res, next) => next()),
      handleValidation,
      updateMethod
    )
}


/**
 * Creates a DELETE route in order to delete a resource by its ID.
 * @param {Object} app - Application instance
 * @param {string} basePath - Base route to your resource. Eg: 'api/v4/users' 
 * @param {Function} deleteMethod - Controller method for deleting the entity.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @author Daniel Galván Cancio
*/
function deleteRoute (app, basePath, deleteMethod, middlewares = [], idPropertyName = 'id') {
  app.route(`${basePath}/:${idPropertyName}`)
    .delete(
      ...middlewares,
      deleteMethod
    )
}

/**
 * Creates the CRUD routes for a resource.
 * @param {Object} app - Application instance
 * @param {string} basePath - Base route to your resource. Eg: 'api/v4/users' 
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to. PLEASE NOTE THAT THIS MIDDLEWARES
 * ARE USED IN ALL ROUTES. This is very important because you cannot specify middlewares
 * with this property.
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @param {Object} [validation] - Validation middleware object. in order to ensure resource
 * consistency and/or business rules. PLEASE NOTE THAT VALIDATIONS ARE ONLY TAKEN INTO
 * ACCOUNT IN CREATE, UPDATE AND PATCH METHODS. This object must have th following properties:
 * createValidation, updateValidation and patchValidation. Note that patchValidation is
 * optional.
 * @param {Object} [multerOptions={}] - Multer options in order to configure multer. This 
 * is only taken into account in create, update and patch methods.
 * MulterOptions properties must be folder (Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.) and 
 * fileProperties (A list of the names of the properties of the entity which are files)
 * @param {Object} controller - This is a controller. It must be an object with the following
 * properties: getAllMethod, getMethod, createMethod, updateMethod, patchMethod and deleteMethod.
 * Each property must be the controller method for the CRUD feature that you want. The
 * property patchMethod is optional, and you can also provide the same updateMethod if you 
 * want to have a patch route.
 * @param {Array<Function>} [specificGetAllMiddlewares=[]] - An optional array where you can define 
 * specific middlewares for getAll route
 * @param {Array<Function>} [specificGetMiddlewares=[]] - An optional array where you can define 
 * specific middlewares for get route 
 * @param {Array<Function>} [specificCreateMiddlewares=[]] - An optional array where you can define 
 * specific middlewares for create route
 * @param {Array<Function>} [specificUpdateMiddlewares=[]] - An optional array where you can define 
 * specific middlewares for update route 
 * @param {Array<Function>} [specificPatchMiddlewares=[]] - An optional array where you can define 
 * specific middlewares for patch route
 * @param {Array<Function>} [specificDeleteMiddlewares=[]] - An optional array where you can define 
 * specific middlewares for delete route
 * @author Daniel Galván Cancio
*/
function CRUDRoutes(app, basePath, middlewares = [], idPropertyName = 'id', validation, multerOptions = {}, controller, 
  specificGetAllMiddlewares = [], specificCreateMiddlewares = [], 
  specificUpdateMiddlewares = [], 
  specificPatchMiddlewares = [],
  specificGetMiddlewares = [], specificDeleteMiddlewares = []  ) {
  const {getAllMethod,getMethod,createMethod,updateMethod,patchMethod,deleteMethod } = controller
  const { createValidation,updateValidation,patchValidation} = validation
  const getAllMiddlewares = [...middlewares, ...specificGetAllMiddlewares]
  const getMiddlewares = [...middlewares, ...specificGetMiddlewares]
  const createMiddlewares = [...middlewares, ...specificCreateMiddlewares]
  const updateMiddlewares = [...middlewares, ...specificUpdateMiddlewares]
  const patchMiddlewares =  [...middlewares, ...specificPatchMiddlewares]
  const deleteMiddlewares = [...middlewares, ...specificDeleteMiddlewares]
  getAllRoute(app, basePath,getAllMethod,getAllMiddlewares)
  getRoute(app, basePath,getMethod,getMiddlewares,idPropertyName)
  createRoute(app, basePath, createMethod, createMiddlewares,createValidation,multerOptions)
  updateRoute(app, basePath, updateMethod, updateMiddlewares,updateValidation,multerOptions,idPropertyName)
  if(patchMethod){
    patchRoute(app, basePath, patchMethod, patchMiddlewares,patchValidation,multerOptions,idPropertyName)
  }
  deleteRoute(app, basePath, deleteMethod, deleteMiddlewares,idPropertyName)
}


/**
 * This function creates a custom GET route.
 * @param {Object} app - Application instance
 * @param {string} path - Base route to your resource. Eg: 'api/v4/users/customRoute' 
 * @param {Function} controllerMethod - Controller method for making the route.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @author Daniel Galván Cancio
*/
function customGETRoute (app, path, controllerMethod, middlewares = []) {
  app.route(path)
    .get(
      ...middlewares,
      controllerMethod
    )
}

/**
 * This function creates a custom POST route.
 * @param {Object} app - Application instance
 * @param {string} path - Base route to your resource. Eg: 'api/v4/users/customRoute' 
 * @param {Function} controllerMethod - Controller method for making the route.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {Function} [validation] - Validation middleware, in order to ensure resource
 * consistency and/or business rules.
 * @param {Object} [multerOptions={}] - Multer options in order to configure multer.
 * MulterOptions properties must be folder (Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.) and 
 * fileProperties (A list of the names of the properties of the entity which are files)
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @author Daniel Galván Cancio
*/
function customPOSTRoute (app,path,controllerMethod ,middlewares = [], validation, multerOptions = {}) {
  app.route(path)
    .post(
      ...middlewares,
      (req, res, next) => {
        const uploader = configureMulter(multerOptions)
        uploader(req, res, (err) => {
          if (err instanceof multer.MulterError || err) {
            return res.status(500).send(err.message)
          }
          next()
        })
      },
      validation || ((req, res, next) => next()),
      handleValidation,
      controllerMethod
    )
}


/**
 * This function creates a custom PUT route.
 * @param {Object} app - Application instance
 * @param {string} path - Base route to your resource. Eg: 'api/v4/users/customRoute' 
 * @param {Function} controllerMethod - Controller method for making the route.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {Function} [validation] - Validation middleware, in order to ensure resource
 * consistency and/or business rules.
 * @param {Object} [multerOptions={}] - Multer options in order to configure multer.
 * MulterOptions properties must be folder (Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.) and 
 * fileProperties (A list of the names of the properties of the entity which are files)
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @author Daniel Galván Cancio
*/
function customPUTRoute (app,path,controllerMethod ,middlewares = [], validation, multerOptions = {}) {
  app.route(path)
    .put(
      ...middlewares,
      (req, res, next) => {
        const uploader = configureMulter(multerOptions)
        uploader(req, res, (err) => {
          if (err instanceof multer.MulterError || err) {
            return res.status(500).send(err.message)
          }
          next()
        })
      },
      validation || ((req, res, next) => next()),
      handleValidation,
      controllerMethod
    )
}

/**
 * This function creates a custom PATCH route.
 * @param {Object} app - Application instance
 * @param {string} path - Base route to your resource. Eg: 'api/v4/users/customRoute' 
 * @param {Function} controllerMethod - Controller method for making the route.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @param {Function} [validation] - Validation middleware, in order to ensure resource
 * consistency and/or business rules.
 * @param {Object} [multerOptions={}] - Multer options in order to configure multer.
 * MulterOptions properties must be folder (Folder where files are going to be saved. Defaultly
 * its 'public/uploads'. Its strongly recommended create the folder before using the 
 * routes. Moreover, its also recommended to have a different folder for each entity
 * and/or file extensions, such as one for images, other for pdfs, etc.) and 
 * fileProperties (A list of the names of the properties of the entity which are files)
 * @param {string} [idPropertyName = 'id'] - The name of the property that references
 * entity`s id. Defaultly its 'id'
 * @author Daniel Galván Cancio
*/
function customPATCHRoute (app,path,controllerMethod ,middlewares = [], validation, multerOptions = {}) {
  app.route(path)
    .patch(
      ...middlewares,
      (req, res, next) => {
        const uploader = configureMulter(multerOptions)
        uploader(req, res, (err) => {
          if (err instanceof multer.MulterError || err) {
            return res.status(500).send(err.message)
          }
          next()
        })
      },
      validation || ((req, res, next) => next()),
      handleValidation,
      controllerMethod
    )
}

/**
 * This function creates a custom DELETE route.
 * @param {Object} app - Application instance
 * @param {string} path - Base route to your resource. Eg: 'api/v4/users/customRoute' 
 * @param {Function} controllerMethod - Controller method for making the route.
 * @param {Array<Function>} [middlewares = []] - An array of middlewares you want to include. You
 * can add here Tencher middlewares if you want to.
 * @author Daniel Galván Cancio
*/
function customDELETERoute (app, path, controllerMethod, middlewares = []) {
  app.route(path)
    .delete(
      ...middlewares,
      controllerMethod
    )
}

module.exports = {
  CRUDRoutes,
  configureMulter,
  createRoute,
  getAllRoute,
  getRoute,
  updateRoute,
  patchRoute,
  deleteRoute,
  customGETRoute,
  customPOSTRoute,
  customPUTRoute,
  customPATCHRoute,
  customDELETERoute
}
