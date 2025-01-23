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
        options: ['1', '2', ]
    };

    static responses = {
        servicos: {
            message: "🏢 A Head Systems oferece soluções completas em TI 💻\n\n" +
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
                    "3 🏠 Voltar ao Menu Principal",
            options: ['1', '2', '3']
        }
    };

    static processMessage(message) {
        const text = message.toLowerCase().trim();
        
        // Menu Principal
        if (!text || text === 'menu' || text === '3' || text === 'voltar') {
            return this.mainMenu.message;
        }

        // Opção 1 - Falar com Especialista
        if (text === '1') {
            return "✨ Um de nossos especialistas entrará em contato em breve! ✨\n\n" +
                   "📞 Você também pode nos contatar diretamente:\n" +
                   "📱 Tel: (31) 3772-0172\n" +
                   "📧 Email: contato@headsystems.com.br\n\n" +
                   "3 🏠 Voltar ao Menu Principal";
        }

        
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
                    "3 🏠 Voltar ao Menu Principal";
        }
        
        

        // Resposta padrão para entradas não reconhecidas
        return "❓ Desculpe, não entendi. 😕\n\n" + this.mainMenu.message;
    }
}

export default SimpleAI;