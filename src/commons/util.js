const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('../config/config')

/**
 * 生成token
 */
exports.generateToken = (payload = {}) => {
    return jwt.sign(payload, config.security.secretKey, {
        expiresIn: config.security.expiresIn
    })
}

exports.getJWTPayload = token => {
    // return jwt.verify(token.split(" ")[1], config.security.secretKey)
    return jwt.verify(token, config.security.secretKey)
}

/**
 * md5加密
 */
exports.MD5 = (password, digest = 'hex') => {
    let md5 = crypto.createHash('md5')
    return md5.update(password).digest(digest)
}