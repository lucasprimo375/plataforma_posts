var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/front/index.html");
});

app.post("/login", function(req, res){
	// validar login
	console.log(req.body);
	// mandar página inicial
	res.sendFile(__dirname + "/front/pagina_inicial.html");
});

app.get("/cadastro", function(req, res){
	res.sendFile(__dirname + "/front/cadastro.html");
});

app.post("/fazer_cadastro", function(req, res){
	console.log(req.body);
	// validar dados
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