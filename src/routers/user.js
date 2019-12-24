const result = require('../commons/result')
const util = require('../commons/util')
const User = require('../models/user')

/**
 * API USER
 */
module.exports = router => {
    /**
     * 登录
     */
    router.post('/user/login', async (ctx) => {
        const { username, password } = ctx.request.body
        if (username == '' || password == '') {
            return
        }
        let findRes = await User.findOne({ username })
        if (!findRes) {
            ctx.body = result.error('User does not exist')
            return
        }
        if (findRes.password !== util.MD5(password.trim())) {
            ctx.body = result.error('Password error')
            return
        }

        const payload = {
            id: findRes._id,
            username,
            password
        }
        const token = util.generateToken(payload)
        ctx.body = result.success({ token })
    })

    /**
     * 注册
     */
    router.post('/user/register', async ctx => {
        const user = ctx.request.body
        const findRes = await User.findOne({ username: user.username })
        if (findRes) {
            ctx.body = result.error('Username already exists')
            return
        }
        const newUser = new User({
            username: user.username,
            password: util.MD5(user.password)
        })
        await newUser.save()
        ctx.body = result.success()
    })
    /**
     * 返回当前用户信息
     */
    router.get('/user/getUserInfo', async ctx => {
        const { token } = ctx.request.body
        const user = util.getJWTPayload(token)
        const userinfo = await User.findOne({ _id: user.id })
        ctx.body = result.success(userinfo)
    })
}

