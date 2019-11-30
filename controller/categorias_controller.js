const Categorias = require("../models/categorias.js").Categorias;

module.exports.buscar_categorias = function(callback){
	Categorias
		.findAll({})
		.then(res => {
			callback(false, res);
		})
		.catch(err => {
			callback(true, error.parent.sqlMessage);
		});
}