/**
 * Created by thorsten on 13.11.15.
 */
window.onload = init;
function init(){
    var SendButton = document.getElementById("button");
    SendButton.onclick = getData;

}

/* Konstruktor
function player(nachname, vorname, verein, headcoach, assistentcoach, number, jahr, aktiv, nichtaktiv, position, favorit){
    this.nachname=nachname;
    this.vorname=vorname;
    this.verein=verein;
    this.headcoach=headcoach;
    this.assistentcoach=assistentcoach;
    this.number=number;
    this.jahr=jahr;
    this.aktiv=aktiv;
    this.nichtaktiv=nichtaktiv;
    this.position=position;
    this.favorit=favorit;

}
*/

//TODO Nachfragen bzgl radiobutton
//TODO Favorit auswertung
function getData (){
    /* Konstruktoraufruf
    var checkData = new player(
        document.getElementById("name").value,
        document.getElementById("vorname").value,
        document.getElementById("verein").value,
        document.getElementById("hcoach").value,
        document.getElementById("acoach").value,
        document.getElementById("number").value,
        document.getElementById("jahr").value,
        document.getElementById("aktiv").value,
        document.getElementById("nichtaktiv").value,
        document.getElementById("position").value,
        document.getElementById("favorit").value
    )
    */


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
    }

    var wrongEntries=[];

    checkYear(checkData, wrongEntries);
    checkNumber(checkData, wrongEntries);
    checkString(checkData, wrongEntries);
    return (checkForWrongEntries(wrongEntries));

}

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