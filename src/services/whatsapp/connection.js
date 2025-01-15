import { Client } from 'whatsapp-web.js';
import chatController from '../../controllers/chatController.js';

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');
});

client.on('message', async (message) => {
    try {
        const response = await chatController.processMessage(message);
        message.reply(response);
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        message.reply('Desculpe, ocorreu um erro ao processar sua mensagem.');
    }
});

client.initialize();

export default client;
