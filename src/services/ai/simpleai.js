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

    static servicesMenu = {
        message: "🏢 Aqui estão os serviços que a *Head Systems* oferece:\n\n" +
            "🔹 *Outsourcing de TI*: Gestão completa de TI e suporte especializado.\n" +
            "🔹 *Virtualização*: Soluções Citrix, Microsoft e VMware para reduzir custos.\n" +
            "🔹 *Segurança da Informação*: Firewall, backup e conformidade LGPD.\n" +
            "🔹 *Desenvolvimento de Software*: Soluções personalizadas para sua empresa.\n\n" +
            "Digite *menu* para voltar ao início.",
        options: ['menu'],
    };

    static faqMenu = {
        message: "ℹ️ *Perguntas Frequentes (FAQ)*:\n\n" +
            "Como funciona o suporte de TI?\n" +
            "Quais benefícios das soluções de virtualização?\n" +
            "Como a Head Systems ajuda com a LGPD?\n\n" +
            "Digite *menu* para voltar ao início.",
        options: ['menu'],
    };

    constructor() {
        this.state = "main"; // Estado inicial
    }

    processMessage(message) {
        const text = message.toLowerCase().trim();

        // Permitir reiniciar o fluxo digitando "menu" em qualquer estado
        if (text === "menu") {
            this.state = "main"; // Reinicia o fluxo para o menu principal
            return SimpleAI.mainMenu.message;
        }

        if (this.state === "main") {
            if (text === "1") {
                this.state = "specialist";
                return "🔔 Estamos verificando a disponibilidade dos especialistas. Por favor, aguarde.";
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

            // Caso a mensagem não seja reconhecida, retorna o menu principal
            return SimpleAI.mainMenu.message;
        }

        if (this.state === "services" || this.state === "faq") {
            return "❌ Opção inválida. Digite *menu* para voltar ao início.";
        }

        if (this.state === "end") {
            return "A conversa já foi encerrada. Para começar de novo, digite *menu*.";
        }

        // Caso algo não previsto aconteça, retorna ao menu principal
        this.state = "main";
        return SimpleAI.mainMenu.message;
    }
}

export default SimpleAI;
