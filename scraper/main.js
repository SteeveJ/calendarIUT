var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var semaine = 8;
var file_data = "data"


var calendar = function(){
    url = 'https://ent.univ-paris13.fr/ajax?__application=emploidutemps&__class=EmploiDuTemps&__function=ajaxRender&__args%5B%5D=DUT2%2520INFORMATIQUE%2520(AS)&__args%5B%5D='+semaine;
    
    // TODO : add 1 to semaine, if cheerio object have not text

    var heure = function(h){
        return h/4;
    }
    
    var day_iso = function(d){
        if(d == 'lundi')
            return "Monday"
        if(d == 'mardi')
            return "Tuesday"
        if(d == 'mercredi')
            return "Wednesday"
        if(d == 'Jeudi')
            return "Thursday"
        if(d == 'vendredi')
            return "Friday"
        return 0;
    }

    var month_iso = function(m){
        if(m.toLowerCase() == 'Janvier')
            return "January"
        if(m.toLowerCase() == 'Février')
            return "February"
        if(m.toLowerCase() == 'Mars')
            return "March"
        if(m.toLowerCase() == 'Avril')
            return "April"
        if(m.toLowerCase() == 'Mai')
            return "May"
        if(m.toLowerCase() == 'Juin')
            return "June"
        if(m.toLowerCase() == 'Juillet')
            return "July"
        if(m.toLowerCase() == 'Août')
            return "Auguste"
        if(m.toLowerCase() == 'Septembre')
            return "September"
        if(m.toLowerCase() == 'Octobre')
            return "October"
        if(m.toLowerCase() == 'Novembre')
            return "November"
        if(m.toLowerCase() == 'Décembre')
            return "December"
        return 0;
    }

    var format_date = function(d){
        var bool_day = 0;
        if(d.toLowerCase() == 'lundi' && d.toLowerCase() == 'lundi' && d.toLowerCase() == 'lundi'
            && d.toLowerCase() == 'lundi' && d.toLowerCase() == 'lundi' 
            && d.toLowerCase() == 'lundi' && d.toLowerCase() == 'lundi' && d.toLowerCase() == 'lundi'){
                bool_day = 1;
        }
        if(bool_day == 1)
            return day_iso(d.toLowerCase())
        
        try{

        }catch{
            
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
    
    var tabJ = Array();
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
            $('.edt_day_block_left_date').filter(function(){
                var data = $(this);
                var menu = "";
                (data.children()).each(function(i, element){
                    console.log($(this).text().trim());
                });

                    console.log("######", date, "#####");
                
            });

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
console.log(loadDataCalendar());