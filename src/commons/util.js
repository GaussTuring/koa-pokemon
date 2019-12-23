const jwt = require('jsonwebtoken')

const config = require('../config/config')

/**
 * 生成token
 */
exports.generateToken = (payload = {}) => {
    return jwt.sign(payload, config.security.secretKey, {
        expiresIn: config.security.expiresIn
    })
}