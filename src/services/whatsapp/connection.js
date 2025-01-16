import { create } from 'venom-bot';
import SimpleAI from '../ai/simpleAI.js';

let qrCodeData = null;

const venombot = create({
    session: 'head-systems-bot',
    multidevice: true,
    headless: true,
    qrTimeout: 60,
    qrQuality: 1,
    createPathFileToken: true,
    catchQR: (base64Qr) => {
        qrCodeData = base64Qr;
    }
})
.then((client) => {
    console.log('Bot iniciado com sucesso!');

    client.onMessage(async (message) => {
        if (!message.isGroupMsg) {
            try {
                const response = SimpleAI.processMessage(message.body);
                
                // Delay para parecer mais natural
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                await client.sendText(message.from, response);
                
            } catch (error) {
                console.error('Erro ao processar mensagem:', error);
                await client.sendText(message.from, 
                    'Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato pelo telefone +55 31 3772-0172');
            }
        }
    });
})
.catch((error) => {
    console.error('Erro ao criar cliente:', error);
});

export const getQRCode = () => qrCodeData;

