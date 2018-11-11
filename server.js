require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const { writeToFile, getValue } = require('./store.js');

const app = express();
const server = require('http').createServer(app).listen(port);
const io = require('socket.io')(server);

console.log(`Listening on port ${port}`);

app.use('/', express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.put('/add', function(req, res) {
    // validate fields
    req.checkBody('key', 'Missing key field').notEmpty();
    req.checkBody('value', 'Missing value field').notEmpty();
    const errors = req.validationErrors();
    // return 400 with json if fields are missing
    if(errors) {
        res.status(400).send(errors);
        console.log('Request is missing fields, write failed!');
        return;
    }
    // try-catch of writing to file
    try {
        writeToFile(req.body.key, req.body.value);
        io.emit('update', req.body);
        res.sendStatus(200);
        console.log('Write successful');
    } catch (err) {
        res.sendStatus(404);
        console.log(err);
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
});

io.on('connection', socket => {
    console.log('User connected');
    socket.on('update', (param) => {
        console.log('Received socket emit');
        io.sockets.emit('update', param);
        console.log(`Updated ${param} with socket`);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
