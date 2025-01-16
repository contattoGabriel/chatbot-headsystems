import { Client } from 'whatsapp-web.js';
import chatController from '../../controllers/chatController.js';

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let qrCode = null;

client.on('qr', (qr) => {
    qrCode = qr;
    console.log('QR Code recebido');
});

client.on('ready', () => {
    console.log('WhatsApp está conectado e pronto para receber mensagens!');
});

client.on('message', async (message) => {
    console.log('Nova mensagem recebida:', message.body);
    try {
        const response = await chatController.processMessage(message);
        console.log('Resposta gerada:', response);
        await message.reply(response);
        console.log('Resposta enviada com sucesso');
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        await message.reply('Olá, no momento Gabriel não está disponível para conversar, mas você pode deixar uma mensagem que ele verá assim que possível.');
    }
});

client.on('disconnected', (reason) => {
    console.log('Cliente WhatsApp desconectado:', reason);
});

client.initialize().catch(err => {
    console.error('Erro ao inicializar cliente:', err);
});

export const getQRCode = () => qrCode;
export default client;

