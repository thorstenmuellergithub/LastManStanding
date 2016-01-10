/**
 * Created by thorsten on 06.01.16.
 */
var express = require('express');
var app = express();

app.get('/', function(req,res){
    var body = 'hello';

    res.set({'content-type': 'text/plain',
             'content-length': body.length});

    res.send(body);
});
app.get('/AllPlayers', function(req,res){
    var body = '../data.json';

    res.set({'content-type': 'text/plain',
        'content-length': body.length});

    res.send(body);
});
app.get('/Favorites', function(req,res){
    var body = 'show favorites';

    res.set({'content-type': 'text/plain',
        'content-length': body.length});

    res.send(body);
});

app.listen(8080);
console.log('express server is online');