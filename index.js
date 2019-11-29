var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var user_controller = require("./controller/user_controller.js");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/front/index.html");
});

app.post("/login", function(req, res){
	user_controller.login(req.body, function(err, msg){
		if(err){
			res.status(404);
		} else {
			res.status(200);
		}
		res.end(msg);
	});
});

app.post("/cadastro", function(req, res){
	user_controller.adicionar_usuario(req.body, function(err, msg){
		if(err){
			res.status(404);
		} else {
			res.status(200);
		}
		res.end(msg);
	});
});

app.post("/buscar_curso", function(req, res){

});

app.post("/adicionar_curso", function(req, res){
	res.sendFile(__dirname + "/front/adicionar_curso.html");
});

app.post("/editar_perfil", function(req, res){

});

app.post("/acessar_categoria", function(req, res){
	console.log(req.body);
});

app.listen(3000, function(){
	console.log("app rodando na porta 3000");
});