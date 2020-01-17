const mongoose = require('mongoose')

const pokemon = {
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    feature: {
        height: {
            type: String,
            require: true
        },
        weight: {
            type: String,
            require: true
        },
        type: {
            type: Array,
            require: true
        },
        ability: {
            type: Array,
            require: true
        },
    },
    region: {
        type: Array,
        require: true
    }
}

module.exports = mongoose.model('pokemon', mongoose.Schema(pokemon))