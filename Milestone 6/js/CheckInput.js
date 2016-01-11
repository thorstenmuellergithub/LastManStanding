/**
 * Created by thorsten on 11.01.16.
 */
/**
 * Created by thorsten on 11.01.16.
 */
/**
 * Created by thorsten on 13.11.15.
 */
window.onload = init;
function init(){
    var SendButton = document.getElementById("button");
    var isActive = document.getElementById("aktiv");
    var isNotActive = document.getElementById("nichtaktiv");
    SendButton.onclick = validateData;
    isActive.onclick = setIsActive;
    isNotActive.onclick = setIsNotActive;

}

//====================Check Entries=======================================================
function validateData (){
    var player={
        nachname:       document.getElementById("name").value,
        vorname:        document.getElementById("vorname").value,
        verein:         document.getElementById("verein").value,
        headcoach:      document.getElementById("hcoach").value,
        assistentcoach: document.getElementById("acoach").value,
        number:         document.getElementById("number").value,
        jahr :          document.getElementById("jahr").value,
        aktiv:          document.getElementById("aktiv").checked,
        nichtaktiv:     document.getElementById("nichtaktiv").checked,
        position:       document.getElementById("position").value,
        favorit:        document.getElementById("favorit").value
    };

    //Check for wrong Entries and save them in the array
    var wrongEntries=[];
    checkYear(player.jahr, wrongEntries);
    checkNumber(player.number, wrongEntries);
    checkString(player, wrongEntries);

    //if no wrong Entries send the player to the server
    if(checkForWrongEntries(wrongEntries)){
        sendData("PUT", "http://127.0.0.1:8080/Player", JSON.stringify(player));
    }


}

function sendData(method, url, data) {
    var req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader("content-type", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            alert(req.response);
        }
    };
    req.send(data);
}


function checkYear(jahr, list){
    if (jahr.length==0 || jahr<0 || jahr > 2015){
        list.push("jahr");
    } else if(checkforNumber(jahr)){
        list.push("jahr");
        return;
    }
}

function checkNumber(number, list){
   if (number.length==0 || number < 4 || number > 15){
       list.push("number");
   } else if(checkforNumber(number)){
       list.push("number");
       return;
   }
}

function checkString (player,list) {
    if (player.assistentcoach.length==0 || checkforString(player.assistentcoach))
        list.push("acoach");

    if (player.headcoach.length==0 || checkforString(player.headcoach))
        list.push("hcoach");

    if (player.verein.length==0 || checkforString(player.verein))
        list.push("verein");

    if (player.vorname.length==0 || checkforString(player.vorname))
        list.push("vorname");

    if (player.nachname.length==0 || checkforString(player.nachname))
        list.push("name");
}

function checkforNumber(input){
    if(input.match(/[^0-9]/))
        return true;

    return false;
}

function checkforString(input){
    if(input.match(/[^a-zA-ZöÖäÄüÜß]/))
        return true;

    return false;
}

 function checkForWrongEntries (list){
// In umgekehrter Reihenfolge prüfen damit der Cursor in das erste falsche Element gesetzt wird
    if (list.length == 0){
        return true;
    } else {
        for (var i=0; i < list.length; i++){
            document.getElementById(list[i]).value = "";
            document.getElementById(list[i]).focus();
            document.getElementById(list[i]).style.border= "1px solid red";
        }
    alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben");
    return false;
    }
}

//Methoden dass nur eine Checkbox checked ist
function setIsActive (){
    document.getElementById("aktiv").checked = true;
    document.getElementById("nichtaktiv").checked = false;
}
function setIsNotActive (){
    document.getElementById("nichtaktiv").checked = true;
    document.getElementById("aktiv").checked = false;
}
