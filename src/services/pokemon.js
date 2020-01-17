const Pokemon = require('../models/pokemon')

module.exports = {
    /**
     * 分类查询宝可梦
     */
    getPokemonClassify: (types, regions) => {

        let query = Pokemon.find()
        if (types) {
            if (Array.isArray(types) && types.length > 1) {
                query.where('feature.type').all(types)
            } else {
                query.where('feature.type').all([types])
            }
        }
        if (regions) {
            if (Array.isArray(regions) && regions.length > 1) {
                query.where('region').all(regions)
            } else {
                query.where('region').all([regions])
            }
        }

        return query
    }

}  