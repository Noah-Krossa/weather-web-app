const WeatherModel = require('./model')
const {getForecastOf} = require('./weatherService')
const Moment = require('moment')

const getForecastOfLast16Days = async (req, res) => {
    const {city_name} = req.params
    let sliceIndex = 0;

    try {
        const result = await WeatherModel.findOne({city_name})
        if(!result) {
            const forecast = await getForecastOf(city_name)
            const register = new WeatherModel(forecast)
            await register.save()
        }

        const lastForecast = result.forecast.map((forecast, i) => {
            const {temp} = forecast
            if(temp > Moment().unix()) {
                if(sliceIndex !== 0) sliceIndex = i
                return forecast
            }
        })

        if(lastForecast.lenght < 7) {
            const {forecast} = await WeatherModel.updateOne({city_name}, {forecast: (await getForecastOf(city_name)).forecast}, {new: true})
            return res.json({
                city_name,
                forecast: forecast.slice(0, 6)
            })
        }

        return res.json({
            city_name,
            forecast: result.forecast.slice(sliceIndex, sliceIndex + 7)
        })

    } catch(e) {
        console.log(e)
    }
}

module.exports = {getForecastOfLast16Days}