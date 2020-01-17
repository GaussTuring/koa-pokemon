const result = require('../commons/result')
const Pokemon = require('../models/pokemon')
const util = require('../commons/util')
const pokemonService = require('../services/pokemon')

/**
 * API POKEMON
 */
module.exports = router => {
    /**
     * 添加宝可梦
     */
    router.post('/pokemon/addPokemon', async ctx => {
        let { name, region, type, ability, height, weight } = ctx.request.body
        const findRes = await Pokemon.findOne({ name })
        if (findRes) {
            ctx.body = result.error('Pokemon already exist')
            return
        }
        let pokemon = {
            name,
            feature: {
                type: type.split(','),
                ability: ability.split(','),
                height,
                weight
            },
            region: region.split(',')
        }

        const files = []

        if (ctx.request.files['img']) {
            files.push(ctx.request.files['img'])
            pokemon.img = 'http://localhost:5050/upload' + `/${ctx.request.files['img'].name}`;
        }
        if (ctx.request.files['icon']) {
            files.push(ctx.request.files['icon'])
            pokemon.icon = 'http://localhost:5050/upload' + `/${ctx.request.files['icon'].name}`;
        }
        if (files.length > 0) {
            util.uploadFiles(files)
        }
        const newPokemon = new Pokemon(pokemon)
        await newPokemon.save()
        ctx.body = result.success()
    })

    /**
     * 获取宝可梦列表
     */
    router.get('/pokemon/getPokemonList', async ctx => {
        const { pageNum = 1, pageSize = 15 } = ctx.query

        const query = pokemonService.getPokemonClassify(ctx.query['type[]'], ctx.query['region[]'])

        const pokemonList = await query.skip((pageNum - 1) * pageSize).limit(pageSize)
        const total = await pokemonService.getPokemonClassify(ctx.query['type[]'], ctx.query['region[]']).countDocuments()

        const data = {
            title: '宝可梦列表',
            data: {
                total,
                list: pokemonList
            }
        }

        ctx.body = result.success(data)
    })

    /**
     * 修改宝可梦
     */
    router.post('/pokemon/updatePokemon', async ctx => {
        let { id, name, region, type, ability, height, weight } = ctx.request.body
        let pokemon = {
            name,
            feature: {
                type: type.split(','),
                ability: ability.split(','),
                height,
                weight
            },
            region: region.split(',')
        }

        const files = []

        if (ctx.request.files['img']) {
            files.push(ctx.request.files['img'])
            pokemon.img = 'http://localhost:5050/upload' + `/${ctx.request.files['img'].name}`;
        }
        if (ctx.request.files['icon']) {
            files.push(ctx.request.files['icon'])
            pokemon.icon = 'http://localhost:5050/upload' + `/${ctx.request.files['icon'].name}`;
        }
        if (files.length > 0) {
            util.uploadFiles(files)
        }

        await Pokemon.where({ _id: id }).updateOne(pokemon)
        ctx.body = result.success()
    })

    /**
     * 删除宝可梦
     */
    router.get('/pokemon/deletePokemon', async ctx => {
        const { id } = ctx.query
        const res = await Pokemon.deleteOne({ '_id': id })
        if (!res) {
            ctx.body = result.error("Pokemon does not exist")
            return
        }
        ctx.body = result.success()
    })

    /**
     * 删除多个宝可梦
     */
    router.get('/pokemon/deleteManyPokemon', async ctx => {
        const list_id = [].concat(ctx.query['list_id[]'])
        const res = await Pokemon.deleteMany({ _id: { $in: list_id } })
        if (!res) {
            ctx.body = result.error("Pokemons does not exist")
            return
        }
        ctx.body = result.success()
    })
}