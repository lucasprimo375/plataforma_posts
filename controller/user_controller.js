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
			callback(true, error.name);
		});
	}
}

module.exports.login = function(login, callback){
	Usuario.findAll({
		where: {
			email: login.email,
			senha: login.senha
		},
		attributes: ["nome", "sobrenome", "email"]
	}).then(res => {
		if(res.length == 0){
			callback(true, "Email ou senha não encontrados");	
		} else {
			callback(false, res[0]);
		}
	}).catch(error => {
		callback(true, error.name);
	});
}

module.exports.editar_usuario = function(dados, callback){
	if(!dados.mudou_senha){
			Usuario.update(
			{
				nome: dados.nome,
				sobrenome: dados.sobrenome
			},
			{
				where: {
					email: dados.email
				}
			}
		).then(res => {
			callback(false, "");
		})
		.catch(err => {
			callback(true, err.name);
		});	
	} else {
		Usuario.update(
			{
				nome: dados.nome,
				sobrenome: dados.sobrenome,
				senha: dados.senha
			},
			{
				where: {
					email: dados.email
				}
			}
		).then(res => {
			callback(false, "");
		})
		.catch(err => {
			callback(true, err.name);
		});
	}
	
}

module.exports.buscar_por_email = function(email_, callback, i=undefined){
	Usuario
		.findAll({
			where: {
				email: email_
			},
			attributes: ["nome", "sobrenome", "email"]
		})
		.then(res => {
			if(res.length == 0){
				callback(true, "Não há usuário com esse email");
			} else {
				if(i != undefined){
					res[0].id = i;
				}
				callback(false, res[0]);
			}
		})
		.catch(err => {
			callback(true, err.name);
		});
}