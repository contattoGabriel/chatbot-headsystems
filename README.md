# Chatbot Head Systems

Este é um projeto de chatbot desenvolvido para a empresa **Head Systems**, com o objetivo de fornecer suporte técnico, agendamento de reuniões, interação com IA e outras funcionalidades relacionadas a soluções de TI.

## 📋 Funcionalidades

- **Interação com IA**: Responde a perguntas e simula orçamentos utilizando a API da OpenAI.
- **Agendamento de Reuniões**: Permite que os usuários agendem reuniões com especialistas.
- **Envio de E-mails**: Confirmação de agendamentos via e-mail utilizando OAuth2 com o Microsoft Graph.
- **Integração com WhatsApp**: Comunicação com clientes via WhatsApp utilizando a biblioteca `venom-bot`.
- **Histórico de Conversas**: Armazena mensagens e respostas no banco de dados PostgreSQL.
- **LGPD**: Inclui um fluxo de aceitação de termos de consentimento em conformidade com a LGPD.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js com Express.js
- **Banco de Dados**: PostgreSQL com Sequelize
- **Integração com IA**: OpenAI API
- **Envio de E-mails**: Nodemailer com OAuth2 (Microsoft Graph)
- **Integração com WhatsApp**: Venom-Bot
- **Autenticação**: Microsoft OAuth2
- **Outras Bibliotecas**:
  - `dotenv` para gerenciamento de variáveis de ambiente
  - `axios` para requisições HTTP
  - `qr-image` para geração de QR Codes

## 📂 Estrutura do Projeto

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL
- Configuração de variáveis de ambiente no arquivo `.env`


📂 **Estrutura de Diretórios**  
Abaixo está a organização do projeto:

```plaintext
chatbot-headsystems/
├── .env                   # Variáveis de ambiente
├── .gitignore             # Arquivos ignorados pelo Git
├── package.json           # Configuração do projeto Node.js
├── README.md              # Documentação do projeto
├── script.js              # Scripts de autenticação OAuth2
├── src/
│   ├── app.js             # Servidor principal
│   ├── config/
│   │   └── database.js    # Configuração do banco de dados
│   ├── controllers/
│   │   └── chatController.js  # Lógica de processamento de mensagens
│   ├── models/
│   │   ├── Chat.js        # Modelo de chat
│   │   └── User.js        # Modelo de usuário
│   ├── routes/
│   │   ├── chatRouter.js       # Rotas do chat
│   │   └── whatsappRouter.js   # Rotas do WhatsApp
│   ├── services/
│   │   ├── ai/
│   │   │   ├── openai.js      # Integração com OpenAI
│   │   │   └── simpleai.js    # IA personalizada
│   │   ├── email/
│   │   │   └── mailservice.js # Serviço de e-mails
│   │   └── whatsapp/
│   │       └── connection.js  # Conexão com WhatsApp
└── tokens/                # Armazena tokens/sessões do WhatsApp
```
