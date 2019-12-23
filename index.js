const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const router = require('./src/routers/index')
const config = require('./src/config/config')

const app = new Koa()


app.use(bodyParser())

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