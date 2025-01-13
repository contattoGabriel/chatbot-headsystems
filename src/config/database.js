import Sequelize from "sequelize";
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false, // Define como true para ver as queries SQL
});

// Testar conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

module.exports = { sequelize, testConnection };
