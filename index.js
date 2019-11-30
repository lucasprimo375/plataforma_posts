var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var formidable = require("formidable");
var fs = require("fs");

var user_controller = require("./controller/user_controller.js");
var categorias_controller = require("./controller/categorias_controller.js");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/front/index.html");
});

app.post("/login", function(req, res){
	user_controller.login(req.body, function(err, data){
		if(err){
			res.status(404);
		} else {
			res.status(200);
		}
		data.dataValues.image_path = __dirname + "/imagens_perfil/" + data.email;
		res.end(JSON.stringify(data));
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
	let form = new formidable.IncomingForm();

	form.parse(req, function (error, fields, files){
		let data = {
			nome: fields.nome,
			sobrenome: fields.nome,
			email: fields.email,
			mudou_senha: false
		}

		fs.unlinkSync(__dirname + "/imagens_perfil/" + data.email);

		fs.rename(files.image.path, __dirname + "/imagens_perfil/" + data.email, function(err){})

		user_controller.editar_usuario(data, function(err, dados){
			if(err) res.status(404);
			else res.status(200)
			
			res.end(JSON.stringify(dados));
		});
	});
});

app.get("/buscar_categorias", function(req, res){
	categorias_controller.buscar_categorias(function(err, cats){
		if(err){
			res.status(404);
		} else {
			res.status(200);
		}
		res.end(JSON.stringify(cats));
	});
});

app.listen(3000, function(){
	console.log("app rodando na porta 3000");
});