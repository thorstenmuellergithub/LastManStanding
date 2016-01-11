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
    SendButton.onclick = getData;
//    isActive.onclick = setIsActive;
//    isNotActive.onclick = setIsNotActive;

}

//====================Check Entries=======================================================
function getData (){


    var checkData={
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
    checkData = JSON.stringify(checkData);
    var wrongEntries=[];

    //checkYear(checkData, wrongEntries);
    //checkNumber(checkData, wrongEntries);
    //checkString(checkData, wrongEntries);

    //if(checkForWrongEntries(wrongEntries)){
    sendData("PUT", "http://127.0.0.1:8080/Player", checkData);
    //}

}

function sendData(method, url, data) {
    var req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {


        }
    };

    req.send(data);
    //window.location.href="http://127.0.0.1/Player";
}











/*
 function checkYear(player, list){
 if (player.jahr.length==0){
 list.push("jahr");
 } else if(player.jahr.match(/[^0-9]/)){
 list.push("jahr");
 return;
 } else {
 if(player.jahr<0){
 list.push("jahr");
 } else if (player.jahr > 2015){
 list.push("jahr");
 }
 }


 }
 function checkNumber(player, list){
 if (player.number.length==0){
 list.push("number");
 } else if(player.number.match(/[^0-9]/)){
 list.push("number");
 return;
 } else {
 if(player.number < 4){
 list.push("number");
 } else if (player.number > 15){
 list.push("number");
 }
 }
 }
 function checkString (player, list){
 if (player.assistentcoach.length==0){
 list.push("acoach");
 } else if (player.assistentcoach.match(/[^a-zA-ZöÖäÄüÜß]/)){
 list.push("acoach");
 }
 if (player.headcoach.length==0){
 list.push("hcoach");
 } else if (player.headcoach.match(/[^a-zA-ZöÖäÄüÜß]/)){
 list.push("hcoach");
 }
 if (player.verein.length==0){
 list.push("verein");
 } else if (player.verein.match(/[^a-zA-ZöÖäÄüÜß]/)){
 list.push("verein");
 }
 if (player.vorname.length==0){
 list.push("vorname");
 } else if (player.vorname.match(/[^a-zA-ZöÖäÄüÜß]/)){
 list.push("vorname");
 }
 if (player.nachname.length==0){
 list.push("name");
 } else if (player.nachname.match(/[^a-zA-ZöÖäÄüÜß]/)){
 list.push("name");
 }
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
 */