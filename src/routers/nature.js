const Nature = require('../models/nature')
const result = require('../commons/result')
/**
 * API NATURE
 */

module.exports = router => {
    /**
     * 性格列表
     */
    router.get('/nature/getNatureList', async ctx => {
        const { pageNum = 1, pageSize = 15 } = ctx.query
        const total = await Nature.countDocuments()
        const naturelist = await Nature.find().skip((pageNum - 1) * pageSize).limit(pageSize)
        ctx.body = result.success({
            title: '性格列表',
            data: {
                total,
                list: naturelist
            }
        })
    })

    /**
     * 添加性格
     */
    router.post('/nature/addNature', async ctx => {
        const { natureName, description } = ctx.request.body
        const findRes = await Nature.findOne({ natureName })
        if (findRes) {
            ctx.body = result.error('Nature already exist')
            return
        }
        const newNature = new Nature({ natureName, description })
        await newNature.save()
        ctx.body = result.success()
    })

    /**
     * 修改性格信息
     */
    router.post('/nature/updateNature', async ctx => {
        const { id, natureName, description } = ctx.request.body
        await Nature.where({ '_id': id }).updateOne({ natureName, description })
        ctx.body = result.success()
    })

    /**
     * 删除性格
     */
    router.get('/nature/deleteNature', async ctx => {
        const { id } = ctx.query
        await Nature.deleteOne({ '_id': id })
        ctx.body = result.success()
    })
}