"use strict";
var loadDataCal = (function () {
    function loadDataCal(buffer) {
    }
    loadDataCal.prototype.getData = function () {
        console.log("data is load");
    };
    return loadDataCal;
}());
exports.loadDataCal = loadDataCal;
var test = new loadDataCal();
test.getData();
