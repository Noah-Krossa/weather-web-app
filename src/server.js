require('dotenv').config()
const Express = require('express')
const dbConnect = require('./database')
const Helmet = require('helmet')
const Cors = require('cors')
const {resolve} = require('path')
const app = Express()

app.use(Express.urlencoded({extended:false}))
app.use(Express.static(resolve(__dirname, 'statics')))
app.use(Express.json())
app.use(Cors())

app.use(Helmet())

/** Routing */
app.use('/api', require('./router'))
app.get('/*', (req, res) => {
    res.sendFile(resolve(__dirname, 'statics/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log('Express application running up!')
})

/** Connecting to mongodb */
dbConnect(process.env.NODE_ENV)