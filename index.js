var express = require('express');
var app = express();

var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

app.set('json spaces', 2);

app.set('port', (process.env.PORT || 5000));

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
        res.json({
            unix : date.getTime()/1000,
            natural: months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        });
    } else {
        res.json({unix: null, natural: null});
    }


});

app.listen(app.get('port'), function(){
    console.log('Server running on ' + app.get('port'));

})