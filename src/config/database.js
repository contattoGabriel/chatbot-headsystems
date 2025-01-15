import Sequelize from "sequelize";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false
});

// Inicializar modelos
const models = [User, Chat];
models.forEach(model => model.init(sequelize));

// Associações entre modelos
User.hasMany(Chat);
Chat.belongsTo(User);

// Função para sincronizar o banco
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com sucesso');
  } catch (error) {
    console.error('Erro ao sincronizar tabelas:', error);
  }
}

// Testar conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com banco de dados estabelecida.");
    await syncDatabase();
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
}

export { sequelize, testConnection };