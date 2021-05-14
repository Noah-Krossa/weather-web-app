const {Schema, model} = require('mongoose')

const weather = new Schema({
    temp: Number,
    date: Number,
    description: String,
    icon: String    
})

const CitySchema = new Schema({
    city_name: {type: String, unique: true},
    forecast: [weather]
})

module.exports = model('weathers', CitySchema)