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

class Curso extends Model {}

Curso.init({
	titulo: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	autor: {
		type: Sequelize.STRING,
		allowNull: false,
		references: {
			model: "usuario",
			key: "email"
		}
	},
	categoria: {
		type: Sequelize.STRING,
		allowNull: false,
		references: {
			model: "categorias",
			key: "nome"
		}	
	}
}, {
	sequelize,
	modelName: "cursos",
	freezeTableName: true,
	timestamps: false
});

module.exports.Curso = Curso;