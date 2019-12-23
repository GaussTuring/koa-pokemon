const Router = require('koa-router')

const router = new Router({
    prefix:'/api'
})

require('./user')(router)

module.exports = router
