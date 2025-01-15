import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: false
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

export { sequelize, testConnection };