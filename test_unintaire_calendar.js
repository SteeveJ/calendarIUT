"use strict";
var calendar_1 = require("./calendar");
var c = new calendar_1.Calendar('https://ent.univ-paris13.fr/ajax?__application=emploidutemps&__class=EmploiDuTemps&__function=ajaxRender&__args%5B%5D=DUT2%2520INFORMATIQUE%2520(AS)&__args%5B%5D=', 8);
function error(error) {
    console.log("your error : ", error);
    return 0;
}
function test_timeBarToTime() {
    var res;
    res = c.barToTime(12);
    if (res != 3)
        return error("La valeur ne vaut pas 3");
    return 1;
}
function test_convertDayString() {
    var res;
    res = c.convertDayString("test");
    if (res != null)
        return error("Il ne renvoie pas null");
    return 1;
}
function test_convertMonth() {
    var res;
    res = c.convertMonth("JANVIER");
    if (res != "January")
        return error("La conversion janvier n'est pas correct pour le mois");
    res = c.convertMonth("FévrieR");
    if (res != "February")
        return error("La conversion fevrier n'est pas correct pour le mois");
    res = c.convertMonth("mars");
    if (res != "March")
        return error("La conversion mars n'est pas correct pour le mois");
    res = c.convertMonth("Avril");
    if (res != "April")
        return error("La conversion avril n'est pas correct pour le mois");
    res = c.convertMonth("mai");
    if (res != "May")
        return error("La conversion mai n'est pas correct pour le mois");
    res = c.convertMonth("juin");
    if (res != "June")
        return error("La conversion juin n'est pas correct pour le mois");
    res = c.convertMonth("Juillet");
    if (res != "July")
        return error("La conversion juillet n'est pas correct pour le mois");
    res = c.convertMonth("août");
    if (res != "Auguste")
        return error("La conversion aout n'est pas correct pour le mois");
    res = c.convertMonth("septembre");
    if (res != "September")
        return error("La conversion septembre n'est pas correct pour le mois");
    res = c.convertMonth("Octobre");
    if (res != "October")
        return error("La conversion octobre n'est pas correct pour le mois");
    res = c.convertMonth("NoVemBre");
    if (res != "November")
        return error("La conversion novembre n'est pas correct pour le mois");
    res = c.convertMonth("décembre");
    if (res != "December")
        return error("La conversion decembre n'est pas correct pour le mois");
    res = c.convertMonth(2);
    if (res != null)
        return error("La conversion devait retourner null");
    return 1;
}
function test_checkDayToInt() {
    var res;
    res = c.checkDayToInt(74);
    if (res != null)
        return error("1 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(-74);
    if (res != null)
        return error("2 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(1);
    if (res != 1)
        return error("3 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(12.54);
    if (res != 12)
        return error("4 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(31);
    if (res != 31)
        return error("5 - Le resultat ne renvoie pas null");
    return 1;
}
function test_checkYear() {
    var res;
    res = c.checkDayToInt(7500);
    if (res != null)
        return error("1 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(-7500);
    if (res != null)
        return error("2 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(2000);
    if (res != 1)
        return error("3 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(2020.54);
    if (res != 2020)
        return error("4 - Le resultat ne renvoie pas null");
    res = c.checkDayToInt(2050);
    if (res != 2050)
        return error("5 - Le resultat ne renvoie pas null");
    return 1;
}
function test_dateIso() {
    var res;
    res = c.dateIso(["1", "2", "3"]);
    if (res != "3-2-1")
        return error("Le retour de date iso ne donne pas 3-2-1");
    res = c.dateIso(["1"]);
    if (res != null)
        return error("Le tableau à besoin n'as qu'un élement");
    res = c.dateIso(["2", "3", "1", "2", "3"]);
    if (res != "1-3-2")
        return error("le Retour de date_iso est incorrect il ne donne pas 1-3-2");
    return 1;
}
function test_formatDate() {
    var res;
    res = c.formatDate("12");
    if (typeof res != "number")
        return error("le format du jours est incorrect");
    if (res != 12)
        return error("Le nombre est incorrect");
    res = c.formatDate("Janvier");
    if (res != "January")
        return error("l'année est incorrect");
    res = c.formatDate("Lundi");
    if (res != "")
        return error("Le programme devait renvoyer \"\" ");
    res = c.formatDate("2020");
    if (res != 2020)
        return error("L'année est incorrect");
    // res = undefined;
    res = c.formatDate("HEllo");
    if (res != undefined)
        return error("probleme");
    return 1;
}
function test() {
    var som = 0;
    var nbTest = 7;
    som += test_convertDayString();
    som += test_convertMonth();
    som += test_timeBarToTime();
    som += test_checkDayToInt();
    som += test_checkYear();
    som += test_dateIso();
    som += test_formatDate();
    if (som != nbTest)
        error("TEST - " + som + "/" + nbTest);
    else
        console.log("SUCCESS TEST");
}
test();
