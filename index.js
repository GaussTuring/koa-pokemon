const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./src/routers/index')

const app = new Koa()


app.use(bodyParser())

app.use(router.routes(), router.allowedMethods())

app.listen(process.env.PORT || 5050, () => {
    console.log('服务已开启!')
})