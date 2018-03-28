var express = require('express');
var app = express();
var word = require('./scripts/scrabble');
var getOperations = require('./scripts/numbers');
var w = new word();

app.use(express.static(__dirname + '/public'));

app.get('/numbers/', function(req, res) {
    
    var list = [25, 100, 2, 6, 8, 3];
    var result;
    
    list.forEach(function(num) {
        var runList = list.filter(x => {return x != num});
        
        result = getOperations(runList, num, 200);
        if (result.success == true) {
            console.log("success: " + num + result.output);
            return;
        }
    });  
    res.send(result);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/api/:letters', function(req, res) {
    var answer = w.find(req.params.letters);
    res.send(answer);
});

app.listen(3000);

