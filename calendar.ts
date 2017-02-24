"use strict";


export class Calendar{
    tabObjModule:  any[];
    date: Array<string>;
    
    constructor(private url: string, private semaine: number){
        this.url = this.url+this.semaine;
    }

    barToTime(time: number){
        return time/4;
    }

    convertDayString(day: any){
        return null;
    }

    convertMonth(month: any){
        if(typeof month == "string"){
            if(month.toLowerCase() == 'janvier')
                return "January";
            if(month.toLowerCase() == 'février')
                return "February";
            if(month.toLowerCase() == 'mars')
                return "March";
            if(month.toLowerCase() == 'avril')
                return "April";
            if(month.toLowerCase() == 'mai')
                return "May";
            if(month.toLowerCase() == 'juin')
                return "June";
            if(month.toLowerCase() == 'juillet')
                return "July";
            if(month.toLowerCase() == 'août')
                return "Auguste";
            if(month.toLowerCase() == 'septembre')
                return "September";
            if(month.toLowerCase() == 'octobre')
                return "October";
            if(month.toLowerCase() == 'novembre')
                return "November";
            if(month.toLowerCase() == 'décembre')
                return "December";
        }
        return null;
    }

    checkDayToInt(day: any){
        if(parseInt(day) >= 1 && parseInt(day) <= 31)
            return parseInt(day);
        return null;
    }

    checkYear(year: any){
        if(parseInt(year)>2000 && parseInt(year)<2050)
            return parseInt(year);
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

    WidthToTimes(time: string){
        if(this.convertWidthToInt(time) > 250){
            return 4;
        }else if(this.convertWidthToInt(time) > 150 && this.convertWidthToInt(time)){
            return 3;
        }else{
            return 2;
        }
    }
}

