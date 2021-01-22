const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b3cfeb66e2118e8a65cd34c67a30fedd&query='+lat+','+long;

    request({'url': url, json: true}, (error, {body}) => {

            if(error) {

                callback('Unable to connect to weather service!', null);

            } else if (body.error) {

                callback('Unable to find weather location!', null);

            } else {

                const weather = {
                    'temperature': body.current.temperature,
                    'feelslike': body.current.feelslike,
                }

                callback(null, weather)

            }

    })
}

module.exports = forecast;