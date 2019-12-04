const Comentario = require("../models/comentario.js").Comentario;

module.exports.adicionar_comentario = function(comentario, callback){
	Comentario
		.create({
			curso: comentario.curso,
			autor: comentario.autor,
			conteudo: comentario.conteudo
		})
		.then(res => {
			callback(false, res);
		})
		.catch(err => {
			callback(true, err.name);
		});
}

module.exports.buscar_por_curso = function(curso_, callback){
	Comentario
		.findAll({
			where: {
				curso: curso_
			},
			attributes: ["autor", "conteudo"]
		})
		.then(res => {
			callback(false, res);
		})
		.catch(err => {
			callback(true, err.name);
		});
}

module.exports.deletar_por_curso = function(curso_, callback){
	Comentario
		.destroy({
			where: {
				curso: curso_
			}
		})
		.then(res => {
			callback(false, res);
		})
		.catch(err => {
			callback(true, err.name);
		});
}