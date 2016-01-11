var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var server = express();

var host = '127.0.0.1';
var port = 8080;


//for instant use
server.use(bodyParser.json());
//server handles cors / which methods are allowed
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'GET, PUT');
    next();
});

server.get('/', function (req,res) {
    console.log('< User connected to Server >');
    res.set({'content-type': 'text/plain'});
    res.end('Sie haben sich erfolgreich auf den WebServer mit der Url <'+ host+ ':' + port +'> verbunden');
});
//GET API which send full json
server.get('/AllPlayers', function(req,res){
    res.set({'content-type': 'application/json'});
    console.log('request for Allplayers');

    //Read and Parse JSON File
    fs.readFile('files/data.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.end(data);
        }
    });
});

//GET API which send the favorites in the json
server.get('/Favorites', function(req,res){
    res.set({'content-type': 'application/json'});
    console.log('request for Favorites');

    fs.readFile('files/data.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var player = JSON.parse(data);
            var favorit = [];
            for (var i=0; i< player.length; i++){
                if (player[i].isFavorite==true){
                    favorit.push(player[i]);
                }
            }
            res.send(favorit);
        }
    });
});

//PUT API to storage a new player
server.put('/Player', function (req,res) {
    fs.open('files/form.txt', 'a', function(err){
        if(err){
            res.end('cannot find file');
            console.log(err);
        } else {
            fs.appendFile('files/form.txt',
                req.body.nachname + ' '  +  req.body.vorname + ' '
                +req.body.jahr + ' '+    req.body.headcoach + ' '
                +req.body.assistentcoach + ' ' + req.body.position + ' '
                +req.body.number+ '\n');

            res.end('player stored in file');
        }
    });
});

//start the server
server.listen(8080, function () {

    console.log("Server is online");
});