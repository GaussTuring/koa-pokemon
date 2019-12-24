const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const koajwt = require('koa-jwt')
const router = require('./src/routers/index')
const config = require('./src/config/config')

const result = require('./src/commons/result')

const app = new Koa()


app.use(bodyParser())

app.use((ctx, next) => {
    return next().catch(err => {
        if (err.status === 401) {
            ctx.status = 200
            ctx.body = result.loginErr(err)
        } else {
            throw err;
        }
    })
})

app.use(
    koajwt({
        secret: config.security.secretKey
    }).unless({
        path: [/\/user\/login/, /\/user\/register/]
    })
)

mongoose.connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'db_pokemon'
})
    .then(() => {
        console.log('Mongodb Connected...')
    })
    .catch(err => {
        console.log(err)
    })

app.use(router.routes(), router.allowedMethods())

app.listen(process.env.PORT || 5050, () => {
    console.log('服务已开启!')
})