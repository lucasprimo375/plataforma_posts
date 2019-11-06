var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/login", function(req, res){
	console.log(req.body);
});

app.listen(3000, function(){
	console.log("app rodando na porta 3000");
});