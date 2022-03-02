const Sequelize  = require('sequelize')

const connection = new Sequelize('XXNAME', 'root', 'XXXXPASSWORD',{
  host: 'localhost',
  dialect: 'mysql'
});


module.exports = connection;