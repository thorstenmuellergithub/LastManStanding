var fs = require('fs');
var json= require('json-api');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/AllPlayers', function(req,res){
    res.set({'content-type': 'application/json'});
    console.log('request for Allplayers');

    //Read and Parse JSON File
    fs.readFile('../data.json', 'utf-8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.end(data);
        }
    });
});


app.get('/Favorites', function(req,res){
    res.set({'content-type': 'application/json'});
    console.log('request for Favorites');

    fs.readFile('../data.json', 'utf-8', function (err, data) {
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

app.all('/Player', function(req,res){

    console.log('hello');
    console.log(req.body.toString());
    res.send('hello');
    var bodyData = req.body;
    bodyData = bodyParser(bodyData);

    fs.open('form.txt', 'a', function(err){
        if(err){
            console.log(err);
        } else {
            fs.appendFile('form.txt',
                          bodyData.name + ' '  +  bodyData.vorname + ' '
                         +bodyData.jahr + ' '+    bodyData.hcoach + ' '
                         +bodyData.acoach + ' ' + bodyData.position + ' '
                         +bodyData.number+ '\n');
        }
    });


    //feedback for serveradmin
    //console.log('saved new entry :');
    //feedback for user
    //res.set(200, {'Content-Type':'text/plain'});
    res.end('Sie haben erfolgreich ' + bodyData.vorname + ' '
        + bodyData.name +' hinzugefuegt!');
});

app.get('/user', function (req, res) {
    res.set(200, {'Content-Type':'text/plain'});
    res.end('Got a PUT request at /user');
});




var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});


