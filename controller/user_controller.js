const Usuario = require("../models/user.js").Usuario;

module.exports.adicionar_usuario = function(usuario, callback){
	Usuario.create({
		nome: usuario.nome,
		sobrenome: usuario.sobrenome,
		email: usuario.email,
		senha: usuario.senha
	}).then(novo_usuario => {
		callback(false);
	}).catch(error => {
		callback(true);
	});
}