var express = require('express');
var app = express();
var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path');

var data = fs.readFileSync(path.join(__dirname, 'hoteldb.csv'), { encoding: 'utf8' });

var options = {
    delimiter: ',',
    quote: '"'
};

var hotelJson = csvjson.toObject(data, options);

app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
})

app.get('/:hotelCity/:sortBy', function (req, res) {

    var hotelCity = toTitleCase(req.params.hotelCity);
    
    var sortBy = req.params.sortBy;
    var result = hotelJson.filter(h => h.CITY == hotelCity);

    if (sortBy === 'DESC') {
        result.sort(function (a, b) {
            return b.PRICE - a.PRICE
        })
    } else {
        result.sort(function (a, b) {
            return a.PRICE - b.PRICE
        })
    }
    res.send(result);
})

app.listen(3000);

console.log("server running on port 3000");


function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}