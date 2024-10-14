const logger = require('./TrencherLogger.js')
const { encryptPropertiesWithEnvValues,decryptPropertiesWithEnvValues,encryptPropertiesWithRamdomKey,decryptPropertiesWithRamdomKey, } = require('./encripter.js')

module.exports = {
    logger,
    encryptPropertiesWithEnvValues,
    decryptPropertiesWithEnvValues,
    encryptPropertiesWithRamdomKey,
    decryptPropertiesWithRamdomKey,
}