import { create } from 'venom-bot';
import SimpleAI from '../ai/simpleai.js';

let qrCodeData = null;

const createButtons = async (client, to, message) => {
    try {
        const buttons = [];
        const messageLines = message.split('\n');
        
        messageLines.forEach(line => {
            if (line.includes('️⃣')) {
                const buttonText = line.replace(/[0-9]️⃣/, '').trim();
                if (buttonText) {
                    buttons.push({
                        buttonId: `btn${buttons.length + 1}`,
                        buttonText: { displayText: buttonText },
                        type: 1
                    });
                }
            }
        });

        const buttonMessage = {
            image: { url: 'https://headsystems.com.br/wp-content/uploads/2023/05/cropped-head-systems-logo-1.png' },
            caption: message,
            footer: 'Head Systems',
            buttons: buttons,
            headerType: 4
        };

        await client.sendButtons(to, '', buttonMessage.buttons, message, buttonMessage.footer);
    } catch (error) {
        console.error('Erro ao criar botões:', error);
        // Fallback para mensagem de texto caso os botões falhem
        await client.sendText(to, message);
    }
};

const redirectToSpecialist = async (client, message, specialistNumber) => {
    try {
        const specialists = {
            '1': '5531987952799', // Rafael
            '2': '5531994344898', // Bruno
            '3': '5531989657822', // Vitor
            '4': '5531999407159'  // Gabriel
        };

        const number = specialists[specialistNumber];
        if (!number) return false;

        const redirectMessage = `Você será redirecionado para o WhatsApp do especialista.\n` +
                              `Clique no link abaixo:\n\n` +
                              `https://wa.me/${number}`;

        await client.sendText(message.from, redirectMessage);
        return true;
    } catch (error) {
        console.error('Erro ao redirecionar para especialista:', error);
        return false;
    }
};

const processResponse = async (client, message, response) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await client.sendText(message.from, response);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        await client.sendText(
            message.from,
            'Desculpe, ocorreu um erro. Por favor, entre em contato pelo telefone (31) 3772-0172'
        );
    }
};

const venombot = create({
    session: 'head-systems-bot',
    multidevice: true,
    headless: 'new',
    useChrome: true,
    debug: true,
    logQR: true,
    browserArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
    ],
    puppeteerOptions: {
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    },
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
                console.log('Mensagem recebida:', message.body);
                const response = SimpleAI.processMessage(message.body);
                await processResponse(client, message, response);
            } catch (error) {
                console.error('Erro ao processar mensagem:', error);
                await client.sendText(
                    message.from,
                    'Desculpe, ocorreu um erro. Por favor, entre em contato pelo telefone (31) 3772-0172'
                );
            }
        }
    });
})
.catch((error) => {
    console.error('Erro ao criar cliente:', error);
});

export const getQRCode = () => qrCodeData;

