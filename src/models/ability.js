const mongoose = require('mongoose')

const ability = {
    abilityName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}

module.exports = mongoose.model('ability', mongoose.Schema(ability))