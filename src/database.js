const {set, connect} = require('mongoose')

module.exports = async (mode) => {
    /** Mongoose settings */
    set('useNewUrlParser', true)
    set('useUnifiedTopology', true)
    set('useCreateIndex', true)
    try {
        if(mode === 'development') {
            await connect(process.env.MONGO_URI)
        }
        console.log('Connected to mongodb database')
    } catch(e) {
        console.error(e)
    }
}