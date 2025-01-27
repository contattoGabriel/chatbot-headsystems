import { create } from 'venom-bot';
import SimpleAI from '../ai/simpleai.js';

let qrCodeData = null;

create({
    session: 'head-systems-bot',
    multidevice: true,
    headless: 'new',
    logQR: true,
    puppeteerOptions: {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    catchQR: (base64Qr) => {
        qrCodeData = base64Qr;
    },
})
    .then((client) => {
        console.log('Bot iniciado com sucesso!');

        const aiInstance = new SimpleAI();

        client.onMessage(async (message) => {
            if (!message.isGroupMsg) {
                try {
                    console.log(`Mensagem recebida: ${message.body}`);
                    const userInput = message.body.trim();
                    const response = aiInstance.processMessage(userInput);

                    if (response === "1" || response === "2" || response === "3" || response === "4") {
                        // Redireciona para o especialista
                        const specialistNumber = response;
                        await redirectToSpecialist(client, message, specialistNumber);
                    } else {
                        // Envia a resposta padrão do SimpleAI
                        await client.sendText(message.from, response);
                    }
                } catch (error) {
                    console.error('Erro ao processar mensagem:', error);
                    await client.sendText(
                        message.from,
                        '⚠️ Ocorreu um erro. Por favor, entre em contato pelo telefone (31) 3772-0172.'
                    );
                }
            }
        });
    })
    .catch((error) => {
        console.error('Erro ao criar cliente:', error);
    });

export const getQRCode = () => qrCodeData;

const redirectToSpecialist = async (client, message, specialistNumber) => {
    try {
        const specialists = {
            '1': { name: 'Rafael', number: '5531987952799' },
            '2': { name: 'Bruno', number: '5531994344898' },
            '3': { name: 'Vitor', number: '5531989657822' },
            '4': { name: 'Gabriel', number: '5531999407159' },
        };

        const specialist = specialists[specialistNumber];
        if (!specialist) return;

        await client.sendText(
            message.from,
            `🔔 Estamos avisando o especialista *${specialist.name}* sobre sua solicitação. Aguarde!`
        );

        const link = `https://wa.me/${specialist.number}`;
        await client.sendText(
            message.from,
            `✅ O especialista *${specialist.name}* está disponível! Você pode falar com ele clicando no link: ${link}`
        );
    } catch (error) {
        console.error('Erro ao redirecionar:', error);
        await client.sendText(message.from, '❌ Erro ao redirecionar para o especialista.');
    }
};
