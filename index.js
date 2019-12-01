var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var formidable = require("formidable");
var fs = require("fs");

var user_controller = require("./controller/user_controller.js");
var categorias_controller = require("./controller/categorias_controller.js");
var curso_controller = require("./controller/curso_controller.js");

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

app.post("/cadastrar_curso", function(req, res){
	let form = new formidable.IncomingForm();

	form.parse(req, function(error, fields, files){
		if(!error){
			let data = {
				titulo: fields.titulo,
				autor: fields.autor,
				categoria: fields.categoria
			};

			let pasta_curso = __dirname + "/cursos/" + data.titulo;

			if(!fs.existsSync(pasta_curso))
				fs.mkdirSync(pasta_curso);
			
			let capa_ = undefined;
			if(files.cadastro_curso_foto_capa != undefined){
				capa_ = pasta_curso + "/capa";
				fs.renameSync(files.cadastro_curso_foto_capa.path, pasta_curso + "/capa");
			}

			let i = 0;
			let anexos_ = [];
			while(files["anexo_" + i] != undefined){
				fs.renameSync(files["anexo_" + i].path, pasta_curso + "/anexo_" + i);
				anexos_.push(pasta_curso + "/anexo_" + i);
				i++;
			}

			let corpo_ = fields.cadastro_curso_corpo;

			fs.writeFileSync(pasta_curso + "/corpo.txt", fields.cadastro_curso_corpo, "utf-8");

			curso_controller.cadastrar_curso(data, function(err, dados){
				if(!err){
					let dados_curso = {
						titulo: fields.titulo,
						capa: capa_,
						anexos: anexos_,
						corpo: corpo_,
						autor: fields.nome + " " + fields.sobrenome,
						categoria: fields.categoria
					};

					res.status(200).end(JSON.stringify(dados_curso));
				} else {
					res.status(404).end(JSON.stringify(dados));
				}
			});
		} else {
			res.status(404).end("Ocorreu um erro com os arquivos");
		}
	});
});

app.listen(3000, function(){
	console.log("app rodando na porta 3000");
});