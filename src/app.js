import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import './services/whatsapp/connection';
import chatRouter from './routes/chatRouter.js';

// Configuração do dotenv
dotenv.config();

// Inicialização do express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'Chatbot API está funcionando!' });
});

// Adicione antes do middleware de erro
app.use('/api/chat', chatRouter);

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Inicialização do servidor
const startServer = async () => {
  try {
    // Testar conexão com banco de dados
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
