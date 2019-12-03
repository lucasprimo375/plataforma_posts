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

class Comentario extends Model {}

Comentario.init({
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	curso:{
		type: Sequelize.STRING,
		references: {
			model: "cursos",
			key: "titulo"
		}
	},
	autor:{
		type: Sequelize.STRING,
		references: {
			model: "usuario",
			key: "email"
		}
	},
	conteudo:{
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	sequelize,
	modelName: "comentarios",
	freezeTableName: true,
	timestamps: false
});

module.exports.Comentario = Comentario;