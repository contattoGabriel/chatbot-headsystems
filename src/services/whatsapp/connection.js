import { create } from 'venom-bot';
import SimpleAI from '../ai/simpleai.js';

const ADMIN_NUMBER = '5531999407159@c.us';
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
    console.log('🚀 Bot iniciado com sucesso!');
    const aiInstance = new SimpleAI();
    
    client.onMessage(async (message) => {
        if (!message.isGroupMsg) {
            try {
                if (!message.body || typeof message.body !== 'string') {
                    console.log('❌ Mensagem inválida recebida');
                    return;
                }

                console.log(`📩 Mensagem recebida: ${message.body}`);
                const userInput = message.body.trim();

                if (!userInput) {
                    console.log('❌ Mensagem vazia recebida');
                    return;
                }

                const response = await aiInstance.processMessage(userInput);

                if (aiInstance.awaitingSpecialist) {
                    await redirectToSpecialist(client, message);
                    aiInstance.awaitingSpecialist = false;
                    return;
                }

                // Update admin notification message
                if (response.complete && response.meetingDetails) {
                    await client.sendText(message.from, response.message);
                    await client.sendText(
                        ADMIN_NUMBER,
                        `📅 Novo agendamento de reunião:\n\n` +
                        `👤 Nome: ${response.meetingDetails.name}\n` +
                        `📆 Data: ${response.meetingDetails.date}\n` +
                        `⏰ Hora: ${response.meetingDetails.time}\n` +
                        `📧 E-mail: ${response.meetingDetails.email}\n` +
                        `📝 Assunto: ${response.meetingDetails.subject}\n` +
                        `📞 Número do cliente: ${message.from.replace('@c.us', '')}`
                    );
                } else {
                    await client.sendText(message.from, response.message);
                }
            } catch (error) {
                console.error('❌ Erro ao processar mensagem:', error);
                await client.sendText(
                    message.from,
                    '⚠️ Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.'
                );
            }
        }
    });
})
.catch((error) => {
    console.error('❌ Erro ao criar cliente:', error);
});

const redirectToSpecialist = async (client, message) => {
    try {
        console.log("🔄 Iniciando redirecionamento para especialistas...");
        const specialists = [
            { name: 'Gabriel', number: '5531999407159' },
            { name: 'Rafael', number: '5531987952799' },
            { name: 'Bruno', number: '5531994344898' },
            { name: 'Vitor', number: '5531989657822' },
        ];

        await client.sendText(
            message.from,
            "🔍 Estamos procurando um especialista disponível. Aguarde um momento..."
        );

        const clientNumber = message.from.replace('@c.us', '');
        let specialistFound = false;

        for (const specialist of specialists) {
            if (specialistFound) break;
            
            console.log(`📩 Tentando contato com ${specialist.name}...`);

            await client.sendText(
                `${specialist.number}@c.us`,
                `👋 Olá ${specialist.name}!\n\n` +
                `Um cliente deseja falar com você.\n` +
                `📞 Número do cliente: ${clientNumber}\n\n` +
                `Digite *OK* para atender agora ou *negativo* se não estiver disponível.`
            );

            const response = await new Promise((resolve) => {
                const timeoutId = setTimeout(() => {
                    resolve('timeout');
                }, 30000);

                const handler = async (specialistMessage) => {
                    if (specialistMessage.from === `${specialist.number}@c.us`) {
                        const reply = specialistMessage.body.toLowerCase().trim();
                        if (reply === 'ok' || reply === 'negativo') {
                            clearTimeout(timeoutId);
                            resolve(reply);
                        }
                    }
                };

                client.onMessage(handler);
            });

            if (response === 'ok') {
                specialistFound = true;
                // Mensagem para o cliente
                await client.sendText(
                    message.from,
                    `✅ O especialista *${specialist.name}* irá atendê-lo!\n` +
                    `📱 Link para contato: https://wa.me/${specialist.number}`
                );
                // Mensagem para o especialista
                await client.sendText(
                    `${specialist.number}@c.us`,
                    `✅ Ótimo! O cliente já foi notificado.\n` +
                    `📱 Link direto para o cliente: https://wa.me/${clientNumber}`
                );
                break;
            } else if (response === 'negativo') {
                console.log(`❌ ${specialist.name} não está disponível.`);
                continue;
            } else {
                console.log(`⏳ ${specialist.name} não respondeu no tempo limite.`);
                continue;
            }
        }

        if (!specialistFound) {
            await client.sendText(
                message.from,
                "😔 No momento, todos os nossos especialistas estão ocupados.\n\n" +
                "Você pode:\n" +
                "1️⃣ Deixar uma mensagem para retorno\n" +
                "2️⃣ Agendar uma reunião (digite *menu* e escolha opção 4)\n" +
                "3️⃣ Abrir um chamado em nosso portal: https://helpdesk.headsystems.com.br:444/\n\n" +
                "Caso tenha alguma duvida de como abrir um chamado, acessar o link abaixo:\n" +
                "https://outlook.office.com/f37d25ce-6242-45ac-a96a-50177ba17069\n\n" +             
                "Como podemos prosseguir?"
            );
        }

    } catch (error) {
        console.error("❌ Erro ao redirecionar para especialista:", error);
        await client.sendText(
            message.from,
            "❌ Ocorreu um erro ao tentar conectar com um especialista. Por favor, tente novamente mais tarde."
        );
    }
};

export const getQRCode = () => qrCodeData;