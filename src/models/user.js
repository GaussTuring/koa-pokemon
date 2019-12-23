const mongoose = require('mongoose')

const user = {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    role: {
        type: Array
    }
}

module.exports = mongoose.model('user', mongoose.Schema(user))