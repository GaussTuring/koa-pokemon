const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const config = require('../config/config')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

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

/**
 * 上传多个文件
 */
exports.uploadFiles = (files) => {
    for (let file of files) {
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let filePath = path.join(__dirname, '../../public/upload/') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
}

/**
 * 生成mongodb ObjectId
 */
// exports.getObjectId = (id)=>{
//     return mongoose.Types.ObjectId(id)
// }