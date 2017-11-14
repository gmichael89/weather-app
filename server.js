let fetch = require('node-fetch')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = express.Router()

var Config = require('./config/app-config.js');

const darkSkyBaseUrl = `${Config.Endpoints.DarkSky}/${Config.ApiKeys.DarkSky}`;

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/getweatherdata/:lat,:lng', (req, res) => {
    console.log('getweatherdata');
    //53.4186504,-2.2391706
    // TODO: Add in dynamic unit selection
    fetch(`${darkSkyBaseUrl}/${req.params.lat},${req.params.lng}?units=si`)
        .then((response) => {
            return response.json();
        }).then((json) => {
            console.log(`Successfully received information at ${new Date()}`)
            return res.json({
                status: 200,
                data: json
            });
        }).catch((ex) => {
            console.log(ex, res.statusCode);
            res.status(500).send({
                status: 500,
                data: ex
            });
        });
});

app.listen(port, (req, res) => {
    console.log(`Server started and listening on port: ${port}`)
});
