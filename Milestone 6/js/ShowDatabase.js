/**
 * Created by thorsten on 11.01.16.
 */
/**
 * Created by thorsten on 11.01.16.
 */
/**
 * Created by thorsten on 25.11.15.
 */
window.onload=init;
function init(){
    getData ("http://127.0.0.1:8080/AllPlayers");
    var allPlayers = document.getElementById("allPlayers");
    var myFavorites = document.getElementById("myFavorites");
    allPlayers.onclick = showPlayers;
    myFavorites.onclick = showFavorites;
}



function getData(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function(){
        if ((req.readyState == 4) && (req.status == 200) && (req.responseText != null)) {
            renderJSON(req.responseText);
        }
    };
    req.send();
}

//TODO CSS klassen löschen
function renderJSON(json){
    var players = JSON.parse(json);

    var tbody = document.createElement("tbody");
    tbody.id = ("tableContent");
    document.getElementById("players").appendChild(tbody);

    for (var i = 0; i < players.length; i++) {
        var row = document.createElement("tr");
        var tablebody = document.getElementById("tableContent");
        tablebody.appendChild(row);

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


}
function showPlayers() {
    HidePlayers ();
    getData ("http://127.0.0.1:8080/AllPlayers");
    document.getElementById("allPlayers").className = "BlueSelected";
    document.getElementById("myFavorites").className = "NotBlueSelected";
}
function showFavorites() {
    HidePlayers ();
    getData ("http://127.0.0.1:8080/Favorites");
    document.getElementById("myFavorites").className = "BlueSelected";
    document.getElementById("allPlayers").className = "NotBlueSelected";
}
function HidePlayers(){
    var tr = document.getElementById("tableContent");
    tr.parentNode.removeChild(tr);
}/**
 * Created by thorsten on 11.01.16.
 */
