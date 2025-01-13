import dotenv from "dotenv";
dotenv.config();

const express = require("express");
const { testConnection } = require("./config/database");
require("./services/whatsapp/connection");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Testar conexão com banco de dados
testConnection();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
