const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=38e899ebd737adbc97156a0b1848ba5f&units=metric'
    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback("Not connected to the web server.Check internet connection.", undefined)
        } else if (body.message) {
            callback("Unable to find location, try something valid.", undefined)
        } else {
            callback(undefined, "It is currently having a weather of " + body.daily[0].weather[0].description + " with a temp of " +
             body.current.temp + " degree celsius. There is a humidity of " + body.current.humidity + "%." + 
             " The average temperature of the day is " + body.daily[0].temp.day + " dergree celsius. The minimum temperature of the day is "+
             body.daily[0].temp.min+ " degree celsius. The maximum temperature of the day is "+
             body.daily[0].temp.max + " degree celsius."+" Clouds percentage "+body.current.clouds+" %.")
        }
    })
}

module.exports = forecast