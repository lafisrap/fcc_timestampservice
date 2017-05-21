var express = require("express"),
	url = require("url"),
	strftime = require("strftime");

var app = express();

app.get( "*", function(req, res) {
	var dateRaw = url.parse(req.url, true),
		time = dateRaw.path.substr(1),
		intTime = parseInt(time) || 0;

	if( intTime <= 31 ) intTime = Date.parse(decodeURI(time))/1000; 
	
	var date = new Date(intTime*1000);
	if( intTime ) res.json({unix: intTime, natural: strftime('%B %d, %Y', date)});
	else res.json({error: "Could't retrieve date from "+time+"."})
});

app.listen(8080, function() {
	console.log("App is listening to port 8080");
});

