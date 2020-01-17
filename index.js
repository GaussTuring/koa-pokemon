const Koa = require('koa')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const mongoose = require('mongoose')
const koajwt = require('koa-jwt')
const router = require('./src/routers/index')
const config = require('./src/config/config')

const result = require('./src/commons/result')

const path = require('path')

const app = new Koa()

app.use(koaStatic(path.join(__dirname,'./public')))

app.use(koaBody({
    multipart: true,
    // formidable: {
    //     uploadDir: path.join(__dirname, 'public/upload/'),
    //     keepExtensions: true,
    //     maxFieldsSize: 2 * 1024 * 1024,
    //     onFileBegin: (name, file) => { // 文件上传前的设置
    //         // console.log(`name: ${name}`);
    //         // console.log(file);
    //     },
    // }
}))


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
        path: [/\/user\/login/, /\/user\/register/,/\/public\//]
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