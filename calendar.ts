"use strict";

export class Calendar{
    date: Array<string>;
    fullUrl: string;
    tabObjModule: any = [];
    tabDate: any = [];
    constructor(public url: string, public week: number){
        this.fullUrl = this.url+this.week;
    }

    setTabObjModule(value: any){
        this.tabObjModule.push(value);
    }
    
    setTabDate(value: any){
        this.tabDate.push(value);
    }


    // methode
    barToTime(time: number){
        return time/4;
    }

    convertDayString(day: any){
        return null;
    }

    convertMonth(month: any){
        if(typeof month == "string"){
            if(month.toLowerCase() == 'janvier')
                return "01";
            if(month.toLowerCase() == 'février')
                return "02";
            if(month.toLowerCase() == 'mars')
                return "03";
            if(month.toLowerCase() == 'avril')
                return "04";
            if(month.toLowerCase() == 'mai')
                return "05";
            if(month.toLowerCase() == 'juin')
                return "06";
            if(month.toLowerCase() == 'juillet')
                return "07";
            if(month.toLowerCase() == 'août')
                return "08";
            if(month.toLowerCase() == 'septembre')
                return "09";
            if(month.toLowerCase() == 'octobre')
                return "10";
            if(month.toLowerCase() == 'novembre')
                return "11";
            if(month.toLowerCase() == 'décembre')
                return "12";
        }
        return null;
    }

    checkDayToInt(day: any){
        if(Math.round(day) >= 1 && Math.round(day) <= 31)
            if(Math.round(day) < 10)
                return "0"+Math.round(day);
            else
                return Math.round(day);
        return null;
    }

    checkYear(year: any){
        if(Math.round(year)>2000 && Math.round(year)<2050)
            return Math.round(year);
        return null;
    }

    dateIso(date: Array<string>){
        if(date.length >= 3)
            return date[2]+"-"+date[1]+"-"+date[0]
        return null;
    }

    formatDate(element: string){
        let jourS = this.convertDayString(element);
        let jourI = this.checkDayToInt(parseInt(element));
        let month = this.convertMonth(element);
        let year = this.checkYear(parseInt(element));
        if(jourS != null)
            return "";
        if(jourI != null)
            return jourI;
        if(month != null)
            return month;
        if(year != null)
            return year;
    }

    completionModuleWithDate(date: Array<string>){
        for(var i = 0; i < this.tabObjModule.length; i++){
            this.tabObjModule[i].date = date[i];
        }
    }

    convertWidthToInt(widthCss: string){
        widthCss = widthCss.replace("width: ", "");
        return parseInt(widthCss.replace("px;", "").trim());
    }

    widthToTimes(width: string){
        if(this.convertWidthToInt(width) >= 250)
            return 4;
        else if(this.convertWidthToInt(width) >= 150 && this.convertWidthToInt(width) < 250)
            return 3;
        else if(this.convertWidthToInt(width) >= 50 && this.convertWidthToInt(width) < 150)
            return 2;
        else
            return 1;
    }
}

