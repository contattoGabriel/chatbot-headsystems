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
            { name: 'Rafael', number: '5531987952799' },
            { name: 'Bruno', number: '5531994344898' },
            { name: 'Vitor', number: '5531989657822' },
            { name: 'Gabriel', number: '5531999407159' },
        ];

        // Inform user that we're looking for specialists
        await client.sendText(
            message.from,
            "🔍 Estamos procurando um especialista disponível para atendê-lo. Por favor, aguarde um momento..."
        );

        let specialistFound = false;
        const clientNumber = message.from.replace('@c.us', '');

        for (const specialist of specialists) {
            if (specialistFound) break;

            console.log(`📩 Tentando contato com ${specialist.name}...`);
            
            try {
                await client.sendText(
                    `${specialist.number}@c.us`,
                    `👋 Olá ${specialist.name}!\n\n` +
                    `Um cliente deseja falar com você.\n` +
                    `📞 Número do cliente: ${clientNumber}\n\n` +
                    `Por favor, responda:\n` +
                    `• Digite *OK* se puder atender agora\n` +
                    `• Digite *negativo* se não estiver disponível`
                );

                const response = await new Promise((resolve) => {
                    const timeout = setTimeout(() => resolve('timeout'), 30000);

                    const messageHandler = (specialistMessage) => {
                        if (specialistMessage.from === `${specialist.number}@c.us`) {
                            clearTimeout(timeout);
                            const reply = specialistMessage.body.toLowerCase();
                            
                            if (reply === 'ok') {
                                resolve('available');
                            } else if (reply === 'negativo' || reply === 'não posso') {
                                resolve('unavailable');
                            }
                        }
                    };

                    client.onMessage(messageHandler);
                });

                if (response === 'available') {
                    console.log(`✅ ${specialist.name} está disponível!`);
                    await client.sendText(
                        message.from,
                        `✅ Ótima notícia! O especialista *${specialist.name}* irá atendê-lo.\n` +
                        `📱 Você será conectado em instantes: https://wa.me/${specialist.number}`
                    );
                    specialistFound = true;
                    break;
                } else if (response === 'unavailable') {
                    console.log(`❌ ${specialist.name} não está disponível.`);
                    await client.sendText(
                        message.from,
                        "🔄 Especialista indisponível. Procurando outro especialista..."
                    );
                    continue;
                } else {
                    console.log(`⏳ ${specialist.name} não respondeu no tempo limite.`);
                    continue;
                }
            } catch (error) {
                console.error(`❌ Erro ao aguardar resposta de ${specialist.name}:`, error);
                continue;
            }
        }

        if (!specialistFound) {
            console.log('❌ Nenhum especialista disponível.');
            await client.sendText(
                message.from,
                "😔 No momento, todos os nossos especialistas estão ocupados.\n\n" +
                "📝 Por favor, descreva sua necessidade ou dúvida em detalhes.\n" +
                "👨‍💼 Um de nossos especialistas entrará em contato assim que possível.\n\n" +
                "Ou se preferir:\n" +
                "• Digite *menu* para ver outras opções de contato\n" +
                "• Digite *agendar* para marcar uma reunião"
            );

            // Aguarda a mensagem do cliente
            const clientResponse = await new Promise((resolve) => {
                const messageHandler = (clientMessage) => {
                    if (clientMessage.from === message.from) {
                        resolve(clientMessage.body);
                    }
                };
                client.onMessage(messageHandler);
            });

            // Encaminha a mensagem para todos os especialistas
            for (const specialist of specialists) {
                await client.sendText(
                    `${specialist.number}@c.us`,
                    `📋 Nova mensagem de cliente:\n\n` +
                    `👤 Cliente: ${clientNumber}\n` +
                    `📝 Mensagem: ${clientResponse}\n\n` +
                    `Entre em contato assim que possível.`
                );
            }

            await client.sendText(
                message.from,
                "✅ Sua mensagem foi registrada!\n" +
                "Um especialista entrará em contato o mais breve possível.\n" +
                "Digite *menu* para voltar ao menu principal."
            );
        }
    } catch (error) {
        console.error("❌ Erro ao redirecionar para especialista:", error);
        await client.sendText(
            message.from,
            "❌ Ocorreu um erro ao tentar redirecionar você. Por favor, tente novamente mais tarde."
        );
    }
};

export const getQRCode = () => qrCodeData;