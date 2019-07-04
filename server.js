const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const router = express.Router();



require('dotenv').config();
require('./config/database');

const apiRouter = require('./routes/api')

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

var Score = require('./models/Score');

app.use('/api', apiRouter);

// app.get('/api/scores', function (req, res) {
//     Score.find({}, function(err, foundS){
//         if (err) console.log(err);
//         res.status(200).json(foundS);
//     })
// });
// app.post('/api/scores', scoresCtrl.create );

//put routes above this 'catch all' route
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});