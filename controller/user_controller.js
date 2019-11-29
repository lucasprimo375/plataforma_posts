const Usuario = require("../models/user.js").Usuario;

module.exports.adicionar_usuario = function(usuario, callback){
	if(usuario.nome == "" || usuario.sobrenome == "" || usuario.email == "" || usuario.senha == ""){
		callback(true, "Parametros inválidos");
	} else {
		Usuario.create({
			nome: usuario.nome,
			sobrenome: usuario.sobrenome,
			email: usuario.email,
			senha: usuario.senha
		}).then(novo_usuario => {
			callback(false, "Cadastro realizado com sucesso");
		}).catch(error => {
			callback(true, error.parent.sqlMessage);
		});
	}
}

module.exports.login = function(login, callback){
	Usuario.findAll({
		where: {
			email: login.email,
			senha: login.senha
		}
	}).then(res => {
		if(res.length == 0){
			callback(true, "Email ou senha não encontrados");	
		} else {
			callback(false, "");
		}
	}).catch(error => {
		callback(true, error.parent.sqlMessage);
	});
}