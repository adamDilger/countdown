var express = require('express');
var app = express();
var word = require('./scripts/scrabble');
var w = new word();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/api/:letters', function(req, res) {
    var answer = w.find(req.params.letters);
    res.send(answer);
});

app.listen(3000);

