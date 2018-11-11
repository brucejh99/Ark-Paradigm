require('dotenv').config();
const port = process.env.PORT || 3000;
const { writeToFile, getValue } = require('./app.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.put('/update', function(req, res) {
    if(req.body.hasOwnProperty('key') && req.body.hasOwnProperty('value')) {
        try {
            console.log('Writing to file');
            writeToFile(req.body.key, req.body.value);
            res.sendStatus(200);
            console.log('Write successful');
        } catch (err) {
            res.sendStatus(404);
            console.log('Write failed');
        }
    } else {
        res.sendStatus(400);
        console.log('Write failed: missing fields');
    }
});

app.get('/getValue/:key', function(req, res) {
    try {
        const value = getValue(req.params.key);
        if(value === undefined) res.sendStatus(404);
        console.log(`Value: ${value}`);
        res.status(200).send(value);
    } catch (err) {
        console.log('Error getting value');
        res.sendStatus(500);
    }
})

// Listen to port
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
