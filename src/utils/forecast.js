const request = require('request')

// Dark API docs: https://darksky.net/dev/docs
// Custom HTTP Headers: https://www.npmjs.com/package/request#custom-http-headers

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2dca3654df33628922f7098a8e3e4bbc/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=en'
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            console.log(url)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast