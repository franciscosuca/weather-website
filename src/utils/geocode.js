const request = require('request')

// Mabbox API docs: https://docs.mapbox.com/api/search/#forward-geocoding
// Custom HTTP Headers: https://www.npmjs.com/package/request#custom-http-headers

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnJhbmNpc2Nvc3VjYSIsImEiOiJjazJscXozNWcwOThhM3BuNThoeGU5a2llIn0.CtolpPFFIt4r4J9FA2PjQQ&limit=1'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }) 
}

module.exports = geocode