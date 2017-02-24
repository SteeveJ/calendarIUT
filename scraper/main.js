var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var semaine = 8;
var file_data = "data"


var calendar = function(){
    url = 'https://ent.univ-paris13.fr/ajax?__application=emploidutemps&__class=EmploiDuTemps&__function=ajaxRender&__args%5B%5D=DUT2%2520INFORMATIQUE%2520(AS)&__args%5B%5D='+semaine;
    
    // TODO : add 1 to semaine, if cheerio object have not text
    var tabJ = Array();
    var heure = function(h){
        return h/4;
    }
    
    var day_iso = function(d){
        return null;
    }

    var month_iso = function(m){
        if(m.toLowerCase() == 'janvier')
            return "January"
        if(m.toLowerCase() == 'février')
            return "February"
        if(m.toLowerCase() == 'mars')
            return "March"
        if(m.toLowerCase() == 'avril')
            return "April"
        if(m.toLowerCase() == 'mai')
            return "May"
        if(m.toLowerCase() == 'juin')
            return "June"
        if(m.toLowerCase() == 'juillet')
            return "July"
        if(m.toLowerCase() == 'août')
            return "Auguste"
        if(m.toLowerCase() == 'septembre')
            return "September"
        if(m.toLowerCase() == 'octobre')
            return "October"
        if(m.toLowerCase() == 'novembre')
            return "November"
        if(m.toLowerCase() == 'décembre')
            return "December"
        return null;
    }
    
    var check_jour = function(j){
        j=parseInt(j);
        if(j >= 1 && j <= 31)
            return j;
        return null;
    }

    var check_year = function(y){
        y=parseInt(y);
        if(y>2000 && y<2050)
            return y
        return null;
    }
    var date_iso = function(date){
        if(date.length >= 3)
            return date[2]+"-"+date[1]+"-"+date[0]
        return null;
    }
    var format_date = function(d){
        jourS = day_iso(d);
        jourI = check_jour(d);
        month = month_iso(d);
        year = check_year(d);
        if(jourS != null)
            return "";
        if(jourI != null)
            return jourI;
        if(month != null)
            return month;
        if(year != null)
            return year;
    }
    var fusionModule = function(d){
        for(var i = 0; i < tabJ.length; i++){
            tabJ[i].date = d[i];
            console.log(tabJ[i]);
        }
    }

    var TailleStringToInt = function(s){
        s = s.replace("width: ", "");
        return parseInt(s.replace("px;", "").trim());
    }
    var TailleEnHeure = function(t){
        if(TailleStringToInt(t) > 250){
            return 4;
        }else if(TailleStringToInt(t) > 150 && TailleStringToInt(t)){
            return 3;
        }else{
            return 2;
        }
    }
    // variables
    
    
    
    request(url, function(error, response, html){

        if(!error){

            var $ = cheerio.load(html);

            $('tr.edtcontent').filter(function(){

                var data = $(this);
                var module = {
                    "heure_debut_1": null,
                    "heure_fin_1": null,
                    "heure_debut_1": null,
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
                               heure_1 = heure(bar_h);
                               module.heure_debut_1 = 8 + heure_1;
                               module.heure_fin_1 = module.heure_debut_1 + TailleEnHeure($(this).attr().style);
                               bar_h = 0;
                            }else if (heure_1 != 0 && heure_2 == 0){
                                module.cours_2 = $(this).text().trim();
                                heure_2 = heure(bar_h);
                                module.heure_debut_2 = module.heure_fin_1 + heure_2;
                                module.heure_fin_2 = module.heure_debut_2 + TailleEnHeure($(this).attr().style);
                                bar_h = 0;
                            }
                        }else{
                            bar_h++;
                        }
                    });
                });
                tabJ.push(module);
                
            });
            var date = [];
            var count = 0;
            $('.edt_day_block_left_date').filter(function(){
                var data = $(this);
                var s = "";
                (data.children()).each(function(i, element){
                    if(count<=4){
                        // console.log($(this).text().trim());
                        if(format_date($(this).text().trim()) != undefined){
                            s += (format_date($(this).text().trim())+" ");
                        }
                    }
                });
                if((date_iso(s.split(" "))) != null)
                    date.push(date_iso(s.split(" ")));
                    
                count++;
            });

            fusionModule(date);

            fs.writeFile(file_data, JSON.stringify(tabJ, null, 4), function (err,data) {
                if (err) {
                    return console.log(err);
                }
                console.log("Sauvegarder du fichier "+file_data);
            });
        }
    })
}


var loadDataCalendar = function(){
    return JSON.parse(fs.readFileSync(file_data).toString());
}

calendar();
// console.log(loadDataCalendar());