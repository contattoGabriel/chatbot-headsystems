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

const redirectToSpecialist = async (client, message) => {
    try {
        const specialists = [
            { name: 'Rafael', number: '5531987952799' },
            { name: 'Bruno', number: '5531994344898' },
            { name: 'Vitor', number: '5531989657822' },
            { name: 'Gabriel', number: '5531999407159' },
        ];

        let specialistAvailable = false;

        for (const specialist of specialists) {
            // Notifica o especialista sobre a solicitação
            await client.sendText(
                `${specialist.number}@c.us`,
                `👋 Olá, ${specialist.name}!\n\nUm cliente gostaria de falar com você.\n` +
                `📞 Número do cliente: ${message.from.replace('@c.us', '')}\n\n` +
                `Responda com *OK* se estiver disponível ou qualquer outra mensagem caso não possa atender.`
            );

            try {
                const specialistStatus = await waitForSpecialistResponse(client, specialist.number);

                if (specialistStatus === "ok") {
                    // Especialista está disponível
                    await client.sendText(
                        message.from,
                        `✅ O especialista *${specialist.name}* está disponível!\n` +
                        `👉 Clique no link para falar com ele diretamente: https://wa.me/${specialist.number}`
                    );

                    // Informa ao especialista que o cliente foi notificado
                    await client.sendText(
                        `${specialist.number}@c.us`,
                        `🔔 Informamos ao cliente que você está disponível. Aguarde o contato do cliente no número: ${message.from.replace('@c.us', '')}.`
                    );

                    specialistAvailable = true;
                    break; // Encerra o loop ao encontrar um especialista disponível
                } else {
                    console.log(`Especialista ${specialist.name} não está disponível.`);
                }
            } catch (error) {
                console.log(`Especialista ${specialist.name} não respondeu a tempo.`);
            }
        }

        if (!specialistAvailable) {
            // Nenhum especialista está disponível ou respondeu a tempo
            await client.sendText(
                message.from,
                `⚠️ No momento, nenhum especialista está disponível para atender sua solicitação.\n` +
                `Por favor, tente novamente mais tarde ou volte ao menu principal digitando *menu*.`
            );
        }
    } catch (error) {
        console.error("Erro ao redirecionar para especialista:", error);
        await client.sendText(
            message.from,
            "❌ Ocorreu um erro ao tentar redirecionar você. Por favor, tente novamente mais tarde."
        );
    }
};


// Função auxiliar para aguardar a resposta do especialista
const waitForSpecialistResponse = (client, specialistNumber) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject("O especialista não respondeu a tempo.");
        }, 30000); // Timeout de 30 segundos

        client.onMessage((specialistResponse) => {
            if (specialistResponse.from === `${specialistNumber}@c.us`) {
                clearTimeout(timeout);
                if (specialistResponse.body.trim().toLowerCase() === "ok") {
                    resolve("ok");
                } else {
                    resolve("unavailable");
                }
            }
        });
    });
};


