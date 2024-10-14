const { handleValidation } = require("./middlewares/TrencherValidationHandlingMiddleware");

const { CRUDRoutes,configureMulter,createRoute,getAllRoute,getRoute,updateRoute,patchRoute,deleteRoute,customGETRoute,customPOSTRoute,customPUTRoute,customPATCHRoute,customDELETERoute, } = require("./routing/TrencherRoutesHelper")

module.exports = {
    handleValidation,
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
    customDELETERoute,
}