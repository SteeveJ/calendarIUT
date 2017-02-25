var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var semaine = 8;
var file_data = "data.bin"

var calendar_1 = require("./calendar");
var c = new calendar_1.Calendar('https://ent.univ-paris13.fr/ajax?__application=emploidutemps&__class=EmploiDuTemps&__function=ajaxRender&__args%5B%5D=DUT2%2520INFORMATIQUE%2520(AS)&__args%5B%5D=', semaine);

var calendar = function(){
    request(c.url, function(error, response, html){

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
            var date = [];
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
                    date.push(iso);
                    
                count++;
            });

            c.completionModuleWithDate(date);

            fs.writeFile(file_data, JSON.stringify(c.tabObjModule, null, 4), function (err,data) {
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