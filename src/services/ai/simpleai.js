class SimpleAI {
    static mainMenu = {
        message: "👋 Olá, sou o assistente virtual da *Head Systems*! 🚀\n\n" +
            "💼 Somos especialistas em:\n" +
            "🔷 Outsourcing de TI\n" +
            "🔷 Virtualização\n" +
            "🔷 Segurança da Informação\n\n" +
            "Como posso ajudar? 😊\n\n" +
            "1️⃣ 👨‍💼 Falar com um Especialista\n" +
            "2️⃣ 🔍 Conhecer Nossos Serviços\n" +
            "3️⃣ ℹ️ Perguntas Frequentes (FAQ)\n" +
            "4️⃣ 🚪 Encerrar Conversa",
        options: ['1', '2', '3', '4'],
    };

    static specialistsMenu = {
        message: "👨‍💼 Por favor, escolha o especialista que você deseja falar:\n\n" +
            "1️⃣ Rafael\n" +
            "2️⃣ Bruno\n" +
            "3️⃣ Vitor\n" +
            "4️⃣ Gabriel\n\n" +
            "Digite o número correspondente ou digite *menu* para voltar ao início.",
        options: ['1', '2', '3', '4'],
    };

    static servicesMenu = {
        message: "🏢 Aqui estão os serviços que a *Head Systems* oferece:\n\n" +
            "1️⃣ 🔹 *Outsourcing de TI*: Gestão completa de TI e suporte especializado.\n" +
            "2️⃣ 🔹 *Virtualização*: Soluções Citrix, Microsoft e VMware para reduzir custos.\n" +
            "3️⃣ 🔹 *Segurança da Informação*: Firewall, backup e conformidade LGPD.\n" +
            "4️⃣ 🔹 *Desenvolvimento de Software*: Soluções personalizadas para sua empresa.\n\n" +
            "Digite *menu* para voltar ao início.",
        options: ['menu'],
    };

    static faqMenu = {
        message: "ℹ️ *Perguntas Frequentes (FAQ)*:\n\n" +
            "1️⃣ Como funciona o suporte de TI?\n" +
            "2️⃣ Quais benefícios das soluções de virtualização?\n" +
            "3️⃣ Como a Head Systems ajuda com a LGPD?\n\n" +
            "Digite *menu* para voltar ao início.",
        options: ['menu'],
    };

    constructor() {
        this.state = "main"; // Estado inicial
    }

    processMessage(message) {
        const text = message.toLowerCase().trim();

        // Permitir reiniciar o fluxo digitando "menu" em qualquer estado, incluindo "end"
        if (text === "menu") {
            this.state = "main"; // Reinicia o fluxo para o menu principal
            return SimpleAI.mainMenu.message;
        }

        if (this.state === "main") {
            if (!text || text === "menu") {
                return SimpleAI.mainMenu.message;
            }

            if (text === "1") {
                this.state = "specialist";
                return SimpleAI.specialistsMenu.message;
            }

            if (text === "2") {
                this.state = "services";
                return SimpleAI.servicesMenu.message;
            }

            if (text === "3") {
                this.state = "faq";
                return SimpleAI.faqMenu.message;
            }

            if (text === "4") {
                this.state = "end";
                return "👋 Obrigado por conversar com a Head Systems! Se precisar de algo, estamos à disposição. 😊";
            }

            return "❌ Opção inválida. Por favor, escolha uma das opções ou digite *menu* para voltar ao início.";
        }

        if (this.state === "specialist") {
            if (SimpleAI.specialistsMenu.options.includes(text)) {
                return text; // O número do especialista será processado em connection.js
            }

            return "❌ Opção inválida. Por favor, escolha um especialista válido ou digite *menu*.";
        }

        if (this.state === "services" || this.state === "faq") {
            return "❌ Opção inválida. Digite *menu* para voltar ao início.";
        }

        if (this.state === "end") {
            return "A conversa já foi encerrada. Para começar de novo, digite *menu*.";
        }

        this.state = "main";
        return SimpleAI.mainMenu.message;
    }
}

export default SimpleAI;
