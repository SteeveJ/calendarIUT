"use strict";
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var default_week = 8;
var default_url = 'https://ent.univ-paris13.fr/ajax?__application=emploidutemps&__class=EmploiDuTemps&__function=ajaxRender&__args%5B%5D=DUT2%2520INFORMATIQUE%2520(AS)&__args%5B%5D=';

var calendar_1 = require("./calendar");
var c = new calendar_1.Calendar(default_url, default_week);
var fileName = "data/calendar.cal";

var Cal = "";
/**
 * Convert text in the file "data/calendar.cal" in the object.
 * @return return to JSON the data in "data/calendar.cal"
 * 
 */
var loadDataCal = function () {
    return JSON.parse(fs.readFileSync(fileName).toString());
};


var createEventArray = function(){
    var events = [];
    var data = loadDataCal();
    for(var m =0;m < data.length; m++){
        var module_1 = {
            title : null,
            start: null,
            end: null
        }
        var module_2 = {
            title : null,
            start: null,
            end: null
        }
        if(data[m].cours_1 != undefined && data[m].cours_1 != null && data[m].cours_1 != ""
        && data[m].heure_debut_1 != null && data[m].heure_fin_1 != null){
            module_1.title = data[m].cours_1;
            //console.log("A -",data[m].heure_debut_1, data[m].heure_fin_1);
            if(data[m].heure_debut_1 < 10)
                module_1.start = data[m].date+"T0"+data[m].heure_debut_1+":00:00";                 
            else
                module_1.start = data[m].date+"T"+data[m].heure_debut_1+":00:00";
            module_1.end = data[m].date+"T"+data[m].heure_fin_1+":00:00";
            events.push(module_1);
        }

        if(data[m].cours_2 != undefined && data[m].cours_2 != null && data[m].cours_2 != "" 
        && typeof data[m].heure_debut_2 !== 'object' && typeof data[m].heure_fin_2 !== 'object'){
            module_2.title = data[m].cours_2;
            //console.log("B -",data[m].heure_debut_2, data[m].heure_fin_2);            
            module_2.start = moment(data[m].date+"T"+data[m].heure_debut_2+":00:00");
            module_2.end = moment(data[m].date+"T"+data[m].heure_fin_2+":00:00");
            events.push(module_2);
        }
        
    }    
    setTimeout(function(){
        $('#calendar').fullCalendar({
                lang: 'fr',
                editable: false, // Don't allow editing of events
                //handleWindowResize: true,
                weekends: false, // Hide weekends
                defaultView: 'agendaWeek', // Only show week view
                //header: true, // Hide buttons/titles
                minTime: '08:00:00', // Start time for the calendar
                maxTime: '19:00:00', // End time for the calendar
                columnFormat: 'dddd',
                displayEventTime: true,
                events: events
        });
    }, 1000);
    // $('#calendar').fullCalendar( 'refresh');
}

/**
 * Write in file "data/calendar.cal" the modules of calendar PARIS 13.
 */
var saveData = function(){
    fs.writeFile(fileName, JSON.stringify(c.tabObjModule, null, 4), function (err,data) {
        if (err) {
            return console.log(err);
        }

    });
}

var calendar = function(fileName){
    request(c.fullUrl, function(error, response, html){
        
        if(!error){

            var $ = cheerio.load(html);

            $('tr.edtcontent').filter(function(){

                var data = $(this);
                var module = {
                    "heure_debut_1": null,
                    "heure_fin_1": null,
                    "heure_debut_2": null,
                    "heure_fin_2": null,
                    "cours_1": null,
                    "cours_2": null,
                    "date": null
                };
                var bar_h = 0;
                var heure_1 = 0;
                var heure_2 = 0;
                
                data.each(function(i, element){
                    ($(this).children()).each(function(i, element){
                        if($(this).text().trim() != ""){
                            if(heure_1 == 0){
                               module.cours_1 = $(this).text().trim();
                               heure_1 = c.barToTime(bar_h);
                               module.heure_debut_1 = 8 + heure_1;
                               module.heure_fin_1 = module.heure_debut_1 + c.widthToTimes($(this).attr().style);
                               bar_h = 0;
                            }else if (heure_1 != 0 && heure_2 == 0){
                                module.cours_2 = $(this).text().trim();
                                heure_2 = c.barToTime(bar_h);
                                module.heure_debut_2 = module.heure_fin_1 + heure_2;
                                module.heure_fin_2 = module.heure_debut_2 + c.widthToTimes($(this).attr().style);
                                bar_h = 0;
                            }
                        }else{
                            bar_h++;
                        }
                    });
                });
                c.setTabObjModule(module);
                
            });
            var count = 0;
            $('.edt_day_block_left_date').filter(function(){
                var data = $(this);
                var s = "";
                (data.children()).each(function(i, element){
                    if(count<=4){
                        var time = c.formatDate($(this).text().trim());
                        if(time != undefined){
                            s += time+" ";
                        }
                    }
                });
                var iso = c.dateIso(s.split(" "));
                if(iso != null)
                    c.setTabDate(iso);
                    
                count++;
            });

            c.completionModuleWithDate(c.tabDate);
            saveData();
        }
    })
}


/** TODO : fixe the random calendar if c.week > 20 */
for(var i = 0; i <= 12; i++){
    calendar();
    // default_week++;
    // var c = new calendar_1.Calendar(default_url, week_default);
    c.week++;
    c.fullUrl = c.url + c.week;
    //console.log(c.week, "\n - ", c.fullUrl , "\n - ",c.tabObjModule);
    if(i == 12)
        createEventArray();
}

$(document).ready(function(){
         
    $("#refresh").on('click', function(){
        createEventArray();
        console.log("test");
    })
         
});