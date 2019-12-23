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
        const user = ctx.request.body
        if (user.username == '' || user.password == '') {
            return
        }
        let findRes = await User.findOne({ username: user.username })
        if (findRes) {
            ctx.body = result.error('User does not exist')
            return
        }
        if (findRes.passoword !== util.MD5(user.password)) {
            ctx.body = result.error('Password error')
            return
        }
        const payload = user
        const token = util.generateToken(payload)
        ctx.body = result.success({ token })
    })

    /**
     * 注册
     */
    router.post('/user/register', async ctx => {
        const user = ctx.request.body
        const findRes = User.findOne(user.username)
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
}

