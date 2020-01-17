const Router = require('koa-router')

const router = new Router({
    prefix: '/api'
})

require('./user')(router)
require('./pokemon')(router)
require('./region')(router)
require('./ability')(router)
require('./nature')(router)

module.exports = router
