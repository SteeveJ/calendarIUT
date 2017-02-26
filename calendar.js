"use strict";
var Calendar = (function () {
    function Calendar(url, week) {
        this.url = url;
        this.week = week;
        this.tabObjModule = [];
        this.tabDate = [];
        this.fullUrl = this.url + this.week;
    }
    Calendar.prototype.setTabObjModule = function (value) {
        this.tabObjModule.push(value);
    };
    Calendar.prototype.setTabDate = function (value) {
        this.tabDate.push(value);
    };
    // methode
    Calendar.prototype.barToTime = function (time) {
        return time / 4;
    };
    Calendar.prototype.convertDayString = function (day) {
        return null;
    };
    Calendar.prototype.convertMonth = function (month) {
        if (typeof month == "string") {
            if (month.toLowerCase() == 'janvier')
                return "01";
            if (month.toLowerCase() == 'février')
                return "02";
            if (month.toLowerCase() == 'mars')
                return "03";
            if (month.toLowerCase() == 'avril')
                return "04";
            if (month.toLowerCase() == 'mai')
                return "05";
            if (month.toLowerCase() == 'juin')
                return "06";
            if (month.toLowerCase() == 'juillet')
                return "07";
            if (month.toLowerCase() == 'août')
                return "08";
            if (month.toLowerCase() == 'septembre')
                return "09";
            if (month.toLowerCase() == 'octobre')
                return "10";
            if (month.toLowerCase() == 'novembre')
                return "11";
            if (month.toLowerCase() == 'décembre')
                return "12";
        }
        return null;
    };
    Calendar.prototype.checkDayToInt = function (day) {
        if (Math.round(day) >= 1 && Math.round(day) <= 31)
            if (Math.round(day) < 10)
                return "0" + Math.round(day);
            else
                return Math.round(day);
        return null;
    };
    Calendar.prototype.checkYear = function (year) {
        if (Math.round(year) > 2000 && Math.round(year) < 2050)
            return Math.round(year);
        return null;
    };
    Calendar.prototype.dateIso = function (date) {
        if (date.length >= 3)
            return date[2] + "-" + date[1] + "-" + date[0];
        return null;
    };
    Calendar.prototype.formatDate = function (element) {
        var jourS = this.convertDayString(element);
        var jourI = this.checkDayToInt(parseInt(element));
        var month = this.convertMonth(element);
        var year = this.checkYear(parseInt(element));
        if (jourS != null)
            return "";
        if (jourI != null)
            return jourI;
        if (month != null)
            return month;
        if (year != null)
            return year;
    };
    Calendar.prototype.completionModuleWithDate = function (date) {
        for (var i = 0; i < this.tabObjModule.length; i++) {
            this.tabObjModule[i].date = date[i];
        }
    };
    Calendar.prototype.convertWidthToInt = function (widthCss) {
        widthCss = widthCss.replace("width: ", "");
        return parseInt(widthCss.replace("px;", "").trim());
    };
    Calendar.prototype.widthToTimes = function (width) {
        if (this.convertWidthToInt(width) >= 250)
            return 4;
        else if (this.convertWidthToInt(width) >= 150 && this.convertWidthToInt(width) < 250)
            return 3;
        else if (this.convertWidthToInt(width) >= 50 && this.convertWidthToInt(width) < 150)
            return 2;
        else
            return 1;
    };
    return Calendar;
}());
exports.Calendar = Calendar;
