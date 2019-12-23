const result = require('../commons/result')
const util = require('../commons/util')

/**
 * API USER
 */
module.exports = router => {
    /**
     * 登录
     */
    router.post('/user/login', async (ctx) => {
        const user = ctx.request.body
        if (user.username !== '' && user.password !== '') {
            const payload = user
            const token = util.generateToken(payload)
            ctx.body = result.success({ token }, '登录成功')
        }
    })

    /**
     * 注册
     */
    router.post('/user/register', async ctx => {
        const user = ctx.request.body
        return result.success()
    })
}

