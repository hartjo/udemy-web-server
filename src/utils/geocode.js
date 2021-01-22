const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamFucmFpbmllcmxsYXJlbmFzIiwiYSI6ImNrazR6d2lrNTE4NWMybnJ6Y3c5NjFwYWMifQ.OAaQ-DU7U2zN8v6IdXt7iA&limit=1';

    request({url, json: true}, (error, {body}) => {

            if(error) {

                callback('Unable to connect to geo service!', null);

            } else if (body.features.length <= 0) {

                callback('Unable to find geo location!', null);

            } else {

                const lat = body.features[0].center[1];
                const long = body.features[0].center[0];
                const loc = body.features[0].place_name;

                const coordinates = {
                    'lat': lat,
                    'long': long,
                    'loc': loc
                }

                callback(null, coordinates)

            }

    })
}

module.exports = geocode;