const axios = require('axios')

const axios = require('axios')

exports.handler = async (event) => {
    let city = '';
    
    if (event.queryStringParameters && event.queryStringParameters.city) {
        console.log("Received base: " + event.queryStringParameters.city);
        city = event.queryStringParameters.city?event.queryStringParameters.city:'Delhi';
    }

    let response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`)
    var final = JSON.stringify(response.data.city)
    return final

}
