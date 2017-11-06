let fetch = require('node-fetch')

const fs = require('fs')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = express.Router()

var Config = JSON.parse(fs.readFileSync('app-config.json'));

const darkSkyBaseUrl = `${Config.Endpoints.DarkSky}/${Config.ApiKeys.DarkSky}`;

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/getweatherdata/:lat,:lng', (req, res) => {

    //53.4186504,-2.2391706
    fetch(`${darkSkyBaseUrl}/${req.params.lat},${req.params.lng}`)
        .then((response) => {
            return response.json();
        }).then((json) => {
            return res.json(json);
        }).catch((ex) => {
            res.status(404).send(ex);
        });
});

app.listen(port, (req, res) => {
    //req.setHeader('Content-Type', 'application/json')
    console.log(`Listening on port ${port}`)
});
