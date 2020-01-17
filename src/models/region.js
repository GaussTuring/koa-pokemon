const moogoose = require('mongoose')

const region = {
    regionName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    }
}

module.exports = moogoose.model('region',moogoose.Schema(region))