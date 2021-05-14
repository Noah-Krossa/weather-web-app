const Axios = require('axios')
const moment = require('moment')
const API_BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily'
const {WEATHER_API_KEY} = process.env

const getForecastOf = async (cityName) => {
    const {data: forecast} = await Axios(`${API_BASE_URL}/?city=${cityName}&key=${WEATHER_API_KEY}`)
    const {data, city_name} = forecast
    const weathers = data.map(ele => {
        const {weather} = ele
        return {
            icon: `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`,
            description: weather.description,
            date: ele.ts,
            temp: ele.temp,
        }
    })
    return {
        city_name,
        forecast: weathers,
    }
}

module.exports = {
    getForecastOf
}