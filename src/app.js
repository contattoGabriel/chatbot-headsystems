import express from 'express';
import dotenv from 'dotenv';
import { testConnection, syncModels } from './config/database.js';
import whatsappRouter from './routes/whatsappRouter.js';
import chatRouter from './routes/chatRouter.js';

// Configuração do dotenv
dotenv.config();

// Inicialização do express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/whatsapp', whatsappRouter);
app.use('/chat', chatRouter);

// Rota básica para teste
app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Inicialização do servidor
const startServer = async () => {
  try {
    // Testar conexão com banco de dados
    await testConnection();
    
    // Sincronizar modelos com o banco de dados
    await syncModels();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;
