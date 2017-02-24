"use strict";
var Calendar = (function () {
    function Calendar(url, semaine) {
        this.url = url;
        this.semaine = semaine;
        this.url = this.url + this.semaine;
    }
    Calendar.prototype.barToTime = function (time) {
        return time / 4;
    };
    Calendar.prototype.convertDayString = function (day) {
        return null;
    };
    Calendar.prototype.convertMonth = function (month) {
        if (typeof month == "string") {
            if (month.toLowerCase() == 'janvier')
                return "January";
            if (month.toLowerCase() == 'février')
                return "February";
            if (month.toLowerCase() == 'mars')
                return "March";
            if (month.toLowerCase() == 'avril')
                return "April";
            if (month.toLowerCase() == 'mai')
                return "May";
            if (month.toLowerCase() == 'juin')
                return "June";
            if (month.toLowerCase() == 'juillet')
                return "July";
            if (month.toLowerCase() == 'août')
                return "Auguste";
            if (month.toLowerCase() == 'septembre')
                return "September";
            if (month.toLowerCase() == 'octobre')
                return "October";
            if (month.toLowerCase() == 'novembre')
                return "November";
            if (month.toLowerCase() == 'décembre')
                return "December";
        }
        return null;
    };
    Calendar.prototype.checkDayToInt = function (day) {
        if (parseInt(day) >= 1 && parseInt(day) <= 31)
            return parseInt(day);
        return null;
    };
    Calendar.prototype.checkYear = function (year) {
        if (parseInt(year) > 2000 && parseInt(year) < 2050)
            return parseInt(year);
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
    Calendar.prototype.WidthToTimes = function (time) {
        if (this.convertWidthToInt(time) > 250) {
            return 4;
        }
        else if (this.convertWidthToInt(time) > 150 && this.convertWidthToInt(time)) {
            return 3;
        }
        else {
            return 2;
        }
    };
    return Calendar;
}());
exports.Calendar = Calendar;
