const mongoose = require('mongoose')

const nature = {
    natureName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}

module.exports = mongoose.model('nature', mongoose.Schema(nature))