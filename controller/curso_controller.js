const Curso = require("../models/curso.js").Curso;

module.exports.cadastrar_curso = function(dados, callback){
	if(dados.autor == "" || dados.categoria == "" || dados.titulo == ""){
		callback(true, "Autor, Título ou Categoria inválidos");
	} else {
		console.log(dados);
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