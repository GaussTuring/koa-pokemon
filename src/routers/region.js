const result = require('../commons/result')
const Region = require('../models/region')

/**
 * REGION API   
 */
module.exports = router => {
    /**
     * 获取地区列表
     */
    router.get('/region/getRegionList', async ctx => {
        const { pageNum, pageSize } = ctx.query
        const total = await Region.find().countDocuments()
        const regionlist = await Region.find().skip((pageNum - 1) * pageSize).limit(pageSize)

        ctx.body = result.success({
            title: '地区列表',
            data: {
                total,
                list: regionlist
            }
        })
    })

    /**
     * 获取全部地区列表
     */
    router.get('/region/getAllRegion', async ctx => {
        const total = await Region.find().countDocuments()
        const regionlist = await Region.find()
        ctx.body = result.success({
            title: '地区列表',
            data: {
                total,
                list: regionlist
            }
        })
    })

    /**
     * 添加地区
     */
    router.post('/region/addRegion', async ctx => {
        const { regionName, description } = ctx.request.body
        const findRes = await Region.findOne({ regionName })
        if (findRes) {
            ctx.body = result.error('Region already exist')
            return
        }
        const newRegion = new Region({
            regionName,
            description
        })
        await newRegion.save()
        ctx.body = result.success()
    })

    /**
     * 修改地区信息
     */
    router.post('/region/updateRegion', async ctx => {
        const { id, regionName, description } = ctx.request.body
        await Region.where({ _id: id }).updateOne({ regionName, description })
        ctx.body = result.success()
    })

    /**
     * 删除地区
     */
    router.get('/region/delRegion', async ctx => {
        const { id } = ctx.query
        await Region.deleteOne({ _id: id })
        ctx.body = result.success()
    })
}