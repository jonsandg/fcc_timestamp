var express = require('express');
var app = express();

var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

app.set('json spaces', 2);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/:timestamp', function(req, res){
    var timestamp = req.params.timestamp;
    if(isNaN(timestamp))
        var date = new Date(timestamp);
    else
        var date = new Date(parseInt(timestamp)*1000);
    
    if(date && date > 0){
        var responseObj = {
            unix : date.getTime()/1000,
            natural: months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        }
        res.json(responseObj);
    } else {
        res.json({unix: null, natural: null});
    }


});

app.listen(8080, function(){
    console.log('Server running on 8080');
    
    console.log((new Date('2012-08-09')).getTime());
    console.log((new Date('abc')).getTime());
    console.log((new Date('2012-12-09')).getTime());
    console.log((new Date(1355011200000)).getTime());
})