class SimpleAI {
    static mainMenu = {
        message: "👋 Olá! Sou o assistente virtual da Head Systems 🚀\n\n" +
            "💼 Somos especialistas em:\n" +
            "🔷 Outsourcing de TI\n" +
            "🔷 Virtualização\n" +
            "🔷 Segurança da Informação\n\n" +
            "Como posso ajudar? 😊\n\n" +
            "1️⃣ 👨‍💼 Falar com um Especialista\n" +
            "2️⃣ 🔍 Conhecer Nossos Serviços\n",
        options: ['1', '2'],
    };

    static greetings = [
        "oi",
        "olá",
        "boa tarde",
        "bom dia",
        "boa noite",
        "e aí",
        "oi tudo bem",
        "como vai",
    ];

    static processMessage(message) {
        const text = message.toLowerCase().trim();

        // Detectar saudações
        if (this.greetings.includes(text)) {
            return "👋 Olá! Como posso ajudar você hoje?\n\n" + this.mainMenu.message;
        }

        // Menu Principal
        if (!text || text === 'menu' || text === '3' || text === 'voltar') {
            return this.mainMenu.message;
        }

        // Opção 1 - Falar com Especialista
        if (text === '1') {
            return { redirectToSpecialist: true, specialistNumber: '1' };
        }

        // Opção 2 - Conhecer Nossos Serviços
        if (text === '2') {
            return "🏢 A Head Systems oferece soluções completas em TI 💻\n\n" +
                "🔹 Outsourcing de TI 👨‍💻\n" +
                "• 🎯 Gestão completa de TI\n" +
                "• 🛠️ Suporte técnico especializado\n\n" +
                "🔹 Virtualização ☁️\n" +
                "• 💪 Soluções Citrix, Microsoft e VMware\n" +
                "• 💰 Redução de custos operacionais\n\n" +
                "🔹 Segurança da Informação 🔒\n" +
                "• 🛡️ Firewall e Backup\n" +
                "• 📋 Conformidade LGPD\n\n" +
                "1️⃣ 👨‍💼 Falar com um Especialista\n" +
                "3️⃣ 🏠 Voltar ao Menu Principal";
        }

        // Resposta padrão para mensagens não reconhecidas
        return "Desculpe, não entendi sua solicitação. 🤔\n" +
               "Por favor, escolha uma das opções do menu abaixo para continuar:\n\n" + 
               this.mainMenu.message;
    }
}

export default SimpleAI;
