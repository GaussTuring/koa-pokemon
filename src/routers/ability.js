const Ability = require('../models/ability')
const result = require('../commons/result')
/**
 * API ABILITY
 */

module.exports = router => {
    /**
     * 特性列表
     */
    router.get('/ability/getAbilityList', async ctx => {
        const { pageNum = 1, pageSize = 15 } = ctx.query
        const total = await Ability.countDocuments()
        const abilitylist = await Ability.find().skip((pageNum - 1) * pageSize).limit(pageSize)
        ctx.body = result.success({
            title: '特性列表',
            data: {
                total,
                list: abilitylist
            }
        })
    })
    /**
     * 获取全部特性列表
     */
    router.get('/ability/getAllAbility', async ctx => {
        const total = await Ability.find().countDocuments()
        const abilitylist = await Ability.find()
        ctx.body = result.success({
            title: '特性列表',
            data: {
                total,
                list: abilitylist
            }
        })
    })

    /**
     * 添加特性
     */
    router.post('/ability/addAbility', async ctx => {
        const { abilityName, description } = ctx.request.body
        const findRes = await Ability.findOne({ abilityName })
        if (findRes) {
            ctx.body = result.error('Ability already exist')
            return
        }
        const newAbility = new Ability({ abilityName, description })
        await newAbility.save()
        ctx.body = result.success()
    })

    /**
     * 修改特性信息
     */
    router.post('/ability/updateAbility', async ctx => {
        const { id, abilityName, description } = ctx.request.body
        await Ability.where({ '_id': id }).updateOne({ abilityName, description })
        ctx.body = result.success()
    })

    /**
     * 删除特性
     */
    router.get('/ability/deleteAbility', async ctx => {
        const { id } = ctx.query
        await Ability.deleteOne({ '_id': id })
        ctx.body = result.success()
    })
}