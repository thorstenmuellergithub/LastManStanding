/**
 * Created by thorsten on 20.11.15.
 */
window.onload = init; //Hier niemals Breakpoint setzen
function init(){
    loadPlayers (players = []);
    var allPlayers = document.getElementById("allPlayers");
    var myFavorites = document.getElementById("myFavorites");
    allPlayers.onclick = showPlayers;
    myFavorites.onclick = showFavorites;
}

function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open("GET", file, false);
    request.send(null);
    return (JSON.parse(request.responseText));

}
function loadPlayers (array){
    var players = readJSON("../js/data.json");
    for (var i = 0; i < players.length; i++){
        array.push(players[i]);

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
        if(players[i].isActive){ //Translate false-true
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
    return array;
}
function showPlayers(){
    for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
        if (document.getElementsByTagName("tr")[i].className == "notVisible") {
            document.getElementsByTagName("tr")[i].className = "visible";
        }
        document.getElementById("allPlayers").className = "BlueSelected";
        document.getElementById("myFavorites").className = "NotBlueSelected";
    }
}
function showFavorites(){
    var players = readJSON("../js/data.json");
    //Start by third row,
    for (var i = 2; i < document.getElementsByTagName("tr").length; i++) {
        //(i-2) -> to get the first element in the JSON file from the third row
        if (!(players[(i-2)].isFavorite)){
            if (document.getElementsByTagName("tr")[i].className == "visible") {
                document.getElementsByTagName("tr")[i].className = "notVisible";
            }
        }
        document.getElementById("allPlayers").className = "NotBlueSelected";
        document.getElementById("myFavorites").className = "BlueSelected";
    }
}