/**
 * Created by thorsten on 25.11.15.
 */
window.onload=init;
function init(){
    getData ();
    var allPlayers = document.getElementById("allPlayers");
    var myFavorites = document.getElementById("myFavorites");
    allPlayers.onclick = showPlayers;
    myFavorites.onclick = showFavorites;
}
var request = new XMLHttpRequest();
var players;


function getData() {
    request.open("GET", "../js/data.json", true); //true damit der aufruf asynchron bleibt
    request.onreadystatechange = callbackHandler;
    request.send();
}

function callbackHandler() {
    if ((request.readyState == 4) && (request.status == 200) && (request.responseText != null)) {

        players = request.responseText;
        players = JSON.parse(players);

        for (var i = 0; i < players.length; i++) {
            var row = document.createElement("tr");
            row.className = "visible";
            var table = document.getElementById("tableContent");
            table.appendChild(row);

            //Daten aus dem JSON auslesen und in <td> stecken als child von row
            var td = document.createElement("td");
            td.innerHTML = (players[i].firstname + " " + players[i].surname);
            row.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = (players[i].team);
            row.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = (players[i].headcoach);
            row.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = (players[i].asisstantcoach);
            row.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = (players[i].position);
            row.appendChild(td);

            var td = document.createElement("td");
            if (players[i].isActive) { //Translate false-true
                td.innerHTML = "Ja";
            } else {
                td.innerHTML = "Nein";
            }
            row.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = (players[i].number);
            row.appendChild(td);

            var td = document.createElement("td");
            td.innerHTML = (players[i].year);
            row.appendChild(td);
        }
        showPlayers;

    }
}
function showPlayers() {
    for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
        if (document.getElementsByTagName("tr")[i].className == "notVisible") {
            document.getElementsByTagName("tr")[i].className = "visible";
        }
        document.getElementById("allPlayers").className = "BlueSelected";
        document.getElementById("myFavorites").className = "NotBlueSelected";
    }
}
function showFavorites() {
    //Start by third row,
    for (var i = 2; i < document.getElementsByTagName("tr").length; i++) {
        //(i-2) -> to get the first element in the JSON file from the third row
        if (!(players[(i - 2)].isFavorite)) {
            if (document.getElementsByTagName("tr")[i].className == "visible") {
                document.getElementsByTagName("tr")[i].className = "notVisible";
            }
        }
        document.getElementById("allPlayers").className = "NotBlueSelected";
        document.getElementById("myFavorites").className = "BlueSelected";
    }
}
