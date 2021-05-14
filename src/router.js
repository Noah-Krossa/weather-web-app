const {Router} = require('express')
const {getForecastOfLast16Days} = require('./controller')

const indexRouter = Router()

indexRouter.get('/:city_name', getForecastOfLast16Days)

module.exports = indexRouter