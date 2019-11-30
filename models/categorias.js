const Sequelize = require("sequelize");

const sequelize = new Sequelize("vaga_cursos", "admin", "admin", {
	host: "localhost",
	dialect: "mysql"/* one of "mysql" | "mariadb" | "postgres" | "mssql" */
});

sequelize
	.authenticate()
  	.then(() => {
    	console.log('Connection has been established successfully.');
  	})
  	.catch(err => {
    	console.error('Unable to connect to the database:', err);
  	});

const Model = Sequelize.Model;

class Categorias extends Model {}

Categorias.init({
	nome:{
		type: Sequelize.STRING,
		primaryKey: true
	}
}, {
	sequelize,
	modelName: "categorias",
	freezeTableName: true,
	timestamps: false
});

module.exports.Categorias = Categorias;