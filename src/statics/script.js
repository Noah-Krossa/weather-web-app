const API_URL_BASE = 'http://localhost:4000/api/'
const dateOptions= {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
}
const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello vue!',
        forecast : [],
        cityName: 'Madrid',
        today: {},
        error: ''
    },
    async mounted() {
        try {
            let {forecast}= await (await fetch(`${API_URL_BASE}${this.cityName}`)).json()
            forecast = forecast.map(ele => {
                ele.date =  new Date(ele.date* 1000).toLocaleDateString('en-UK', dateOptions).toLocaleUpperCase()
                return ele
            })
            this.today = forecast.shift()
            this.forecast = forecast
            console.log(this.forecast)

        } catch(e) {
            console.log(e)
            this.error = e
        }
    }
})