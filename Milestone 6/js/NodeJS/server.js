/**
 * Created by thorsten on 06.01.16.
 */
var http = require('http');
var querystring = require('querystring');
var fs = require('fs');

var IP ='127.0.0.1';
var PORT = 8080;

//TODO querystring.parse selber implementi    console.log(body);eren
//TODO in module aufteilen und einbinden

//TODO - bzgl dem XMLHttpRequest Objekt (hatte ich ja schon gemeint, bzgl den Errorabfragen, dass du am besten nochmal genau den Einsatz davon in meinen Folien nachsiehst.
//TODO - Die zuvielen DIVs um die InuputFields sind unnötig und blähen dein HTML auf (jeh mehr kB dein HTML hat desto länger dauert der Netzwerktransfer)
//TODO - Achte auch darauf, dass im CSS keine Redundanzen vorliegen bevor du zwei, dreimal in CSS-Klassen ein Attribut color:RGB(1,1,1) hinzufügst, mach lieber eine extra CSS Klasse daraus nur mit dem Attribut
//TODO - Die RegExpressions für Zahlen und Nummern sind ja auch überall gleich, dies kann man aus Redundanzgründen auch auslagern



http.createServer(function (req, res) {
    res.writeHead(200, {'content-type': 'text/plain;' + 'charset=utf-8'});

    console.log('User connected to Server');
    res.write('Sie haben sich erfolgreich auf den WebServer mit der Url <' + IP +':'+ PORT +'> verbunden\n\n');

    //Query String auslesen und als Objekt speichern
    if (req.url.indexOf('?') >= 0) {
        var query = querystring.parse(req.url.replace(/^.*\?/, ''));

        var file = 'Spieler: ' + query.vorname + ' ' + query.name + ', ' +
            query.jahr + ', ' + query.hcoach + ', ' + query.acoach + ', ' +
            query.position + ', ' + query.number + '\n';
    }

    //in datei schreiben
    fs.open('form.txt', 'a', function(err){
        if(err){
            console.log(err);
        } else {
            fs.appendFile('form.txt', file);
        }
    });

    res.end(file);
}).listen(PORT, IP);
console.log('Server online');
