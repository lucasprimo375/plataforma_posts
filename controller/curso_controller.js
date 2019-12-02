const Curso = require("../models/curso.js").Curso;
const Sequelize = require("sequelize");

module.exports.cadastrar_curso = function(dados, callback){
	if(dados.autor == "" || dados.categoria == "" || dados.titulo == ""){
		callback(true, "Autor, Título ou Categoria inválidos");
	} else {
		Curso
			.create(dados)
			.then(res => {
				callback(false, "Curso cadastrado com sucesso");
			})
			.catch(err => {
				callback(true, "Erro ao cadastrar o curso");
			});
	}
}

module.exports.cursos_em_destaque = function(categoria, callback){
	let where = {};

	if(categoria != undefined)
		where.categoria = categoria;

	Curso.findAll({
		where,
		attributes: ["titulo"]
	}).then(res => {
		callback(false, res);
	}).catch(err => {
		callback(true, err.name);
	});
}

module.exports.buscar_por_titulo = function(titulo_, callback){
	Curso
		.findAll({
			where: {
				titulo: titulo_
			},
			attributes: ["autor", "categoria"]
		})
		.then(res => {
			if(res.length == 0){
				callback(true, "Não existe curso com esse título");
			} else {
				callback(false, res[0]);
			}
		})
		.catch(err => {
			callback(true, err.name);
		});
}

module.exports.buscar_por_titulo_semelhante = function(titulo_, callback){
	Curso
		.findAll({
			where: {
				titulo: {[Sequelize.Op.like]: "%" + titulo_ + "%"}
			},
			attributes: ["titulo"]
		})
		.then(res => {
			callback(false, res);
		})
		.catch(err => {
			callback(true, err.name);
		});
}