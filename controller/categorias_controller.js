const Categorias = require("../models/categorias.js").Categorias;

module.exports.buscar_categorias = function(callback){
	Categorias
		.findAll({})
		.then(res => {
			callback(false, res);
		})
		.catch(err => {
			callback(true, error.name);
		});
}

module.exports.cadastrar_categorias = function(categorias){
	for(let i = 0; i < categorias.length; i++){
		Categorias
			.create({
				nome: categorias[i]
			})
			.then(res => {})
			.catch(err => {});
	}
}