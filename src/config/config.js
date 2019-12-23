/**
 * 配置项
 */
const config = {
    security: {
        secretKey: 'POKEMON',
        expiresIn: 60 * 60 * 24 * 7
    },
    mongodbUri: 'mongodb+srv://GaussTuring:chenyifa67373@cluster0-uw00u.mongodb.net/'
}

module.exports = config