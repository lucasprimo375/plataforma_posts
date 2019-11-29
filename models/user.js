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

class Usuario extends Model {}

Usuario.init({
	nome:{
		type: Sequelize.STRING,
		allowNull: false
	},
	sobrenome:{
		type: Sequelize.STRING,
		allowNull: false
	},
	email:{
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	senha:{
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	sequelize,
	modelName: "usuario",
	freezeTableName: true,
	timestamps: false
});

module.exports.Usuario = Usuario;