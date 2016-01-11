/**
 * Created by thorsten on 11.01.16.
 */
/**
 * Created by thorsten on 11.01.16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var server = express();


//now you can directly access the request body as an JSON object
server.use(bodyParser.json());
//handle the CORS access
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, PUT');
    next();
});

server.get('/', function(req,res){
    res.set();
});

server.get('/AllPlayers', function(req,res){
    res.set({'content-type': 'application/json'});
    console.log('request for Allplayers');

    //Read and Parse JSON File
    fs.readFile('data.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.end(data);
        }
    });
});


server.get('/Favorites', function(req,res){
    res.set({'content-type': 'application/json'});
    console.log('request for Favorites');

    fs.readFile('data.json', 'utf-8', function (err, data) {
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

server.put('/player', function (req,res) {
    console.log(req.body);
    var bodyData = req.body;
    fs.open('form.txt', 'a', function(err){
        if(err){
            console.log(err);
        } else {
            fs.appendFile('form.txt',
                bodyData.nachname + ' '  +  bodyData.vorname + ' '
                +bodyData.jahr + ' '+    bodyData.headcoach + ' '
                +bodyData.assistentcoach + ' ' + bodyData.position + ' '
                +bodyData.number+ '\n');
        }
    });

    //res.writeHead(200, {'Content-Type':'text/plain'});
    res.send('hello');
});

var server = server.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});