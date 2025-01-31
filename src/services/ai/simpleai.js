import emailService from '../email/mailservice.js';

class SimpleAI {
    static lgpdTerms = {
        message: "📜 *Termos de Uso - LGPD*\n\n" +
            "Antes de continuar, precisamos que você concorde com:\n\n" +
            "1. Coletaremos apenas dados necessários para o atendimento\n" +
            "2. Seus dados serão armazenados com segurança\n" +
            "3. Você pode solicitar exclusão a qualquer momento\n\n" +
            "Digite *\"aceitar\"* para concordar e continuar.",
        options: ['aceitar'],
    };

    static mainMenu = {
        message: "👋 *Bem-vindo(a) à Head Systems!* 🚀\n" +
            "*Soluções inovadoras em TI para transformar seu negócio!*\n\n" +
            
            "✨ *Nossas Especialidades:*\n" +
            "▫️ Gestão Completa de TI\n" +
            "▫️ Virtualização de Servidores/Desktops\n" +
            "▫️ Segurança Cibernética\n" +
            "▫️ Gerenciamento de Dispositivos (MDM)\n" +
            "▫️ Infraestrutura em Nuvem\n\n" +
            
            "📌 *Como posso ajudar?*\n\n" +
            "👉 1️⃣ `Falar com especialista`\n" +
            "👉 2️⃣ `Serviços` - Conhecer detalhes\n" +
            "👉 3️⃣ `FAQ` - Tire dúvidas rápidas\n" +
            "👉 4️⃣ `Agendar`- Reunião técnica\n" +
            "👉 5️⃣ `Sobre` - Nossa história\n" +
            "👉 6️⃣ `Contato` - Canais diretos\n" +
            "👉 7️⃣ `Sair` - Encerrar atendimento\n\n",
            
        options: ['1', '2', '3', '4', '5', '6', '7'],
    };

    static servicesMenu = {
        message: "🏢 Aqui estão os principais serviços que a *Head Systems* oferece:\n\n" +
            "🔹 *Gestão Completa de TI*: Suporte técnico especializado e administração de infraestrutura de TI.\n" +
            "🔹 *Virtualização de Servidores e Desktops*: Soluções para otimização de recursos e redução de custos.\n" +
            "🔹 *Segurança da Informação*: Proteção de dados, backup gerenciado e conformidade com a LGPD.\n" +
            "🔹 *Gerenciamento de Dispositivos Móveis*: Monitoramento e controle de dispositivos corporativos.\n" +
            "🔹 *Cloud Computing*: Soluções em nuvem para escalabilidade e flexibilidade.\n" +
            "🔹 *Consultoria em TI*: Planejamento estratégico e implementação de soluções tecnológicas.\n" +
            "🔹 *Infraestrutura de Redes*: Projetos, implantação e manutenção de redes corporativas.\n\n" +
            "Digite *menu* para voltar ao início.",
        options: ['menu'],
    };

    static faqMenu = {
        message: "ℹ️ *Perguntas Frequentes (FAQ)*:\n\n" +
            "Como funciona o suporte de TI?\n" +
            "Quais benefícios das soluções de virtualização?\n" +
            "Como a Head Systems ajuda com a LGPD?\n" +
            "Digite *menu* para voltar ao início.\n" +
            "Para saber todas essas informações, acesse nosso site: https://headsystems.com.br\n\n",
        options: ['menu'],
    };

    static aboutUsMenu = {
        message: "📖 *Sobre Nós*:\n\n" +
            "A *Head Systems* é uma empresa especializada em soluções de TI, oferecendo serviços de outsourcing, virtualização, segurança da informação e desenvolvimento de software. Nossa missão é fornecer soluções tecnológicas inovadoras que atendam às necessidades dos nossos clientes.\n\n" +
            "Digite *menu* para voltar ao início.",
        options: ['menu'],
    };

    static contactMenu = {
        message: "📞 *Contato*:\n\n" +
            "📧 E-mail: contato@headsystems.com.br\n" +
            "📞 Telefone: (31) 3772-0172\n" +
            "🌐 Site: https://headsystems.com.br\n\n" +
            "Digite *menu* para voltar ao início.",
        options: ['menu'],
    };

    constructor() {
        this.state = "welcome"; // Estado inicial: mensagem de boas-vindas
        this.schedulingData = {};
        this.currentStep = 0;
        this.lastMeetingDetails = null;
        this.awaitingSpecialist = false;
        this.termsAccepted = false; // Flag de aceitação dos termos
    }

    processMessage(message) {
        if (!message || typeof message !== 'string') {
            return { message: "❌ Mensagem inválida. Por favor, tente novamente.", complete: false };
        }

        const text = message.toLowerCase().trim();

        // Handle global 'menu' command
        if (text === 'menu') {
            this.resetState();
            return { message: SimpleAI.mainMenu.message, complete: false };
        }

        // Caso o usuário não envie texto válido
        if (!text) return { message: this.getCurrentStateMessage(), complete: false };

        // Fluxo principal
        switch (this.state) {
            case "welcome":
                return this.handleWelcomeFlow(text);
            case "terms":
                return this.handleLGPDTerms(text);
            case "main":
                return this.handleMainFlow(text);
            case "scheduling":
                return this.handleSchedulingFlow(text);
            default:
                return { message: "❌ Erro no fluxo. Digite *menu*.", complete: false };
        }
    }

    // ======================================
    // Fluxo de Boas-Vindas
    // ======================================
    handleWelcomeFlow(text) {
        if (text === "iniciar") {
            this.state = "terms";
            return { 
                message: SimpleAI.lgpdTerms.message, 
                complete: false 
            };
        } else {
            return { 
                message: "👋 Olá! Eu sou o assistente virtual da *Head Systems*.\n\n" +
                    "Antes de começarmos, digite *\"iniciar\"* para prosseguir.",
                complete: false
            };
        }
    }

    // ======================================
    // Fluxo de Aceitação dos Termos LGPD
    // ======================================
    handleLGPDTerms(text) {
        if (text === "aceitar") {
            this.termsAccepted = true;
            this.state = "main";
            return { 
                message: "✅ Termos aceitos! Como posso ajudar?\n\n" + SimpleAI.mainMenu.message, 
                complete: false 
            };
        } else {
            return { 
                message: "❌ Você precisa aceitar os termos para continuar. Digite *\"aceitar\"*.",
                complete: false
            };
        }
    }

    // ======================================
    // Fluxo Principal do Chatbot
    // ======================================
    handleMainFlow(text) {
        if (text === "menu") {
            this.resetState();
            return { message: SimpleAI.mainMenu.message, complete: false };
        }

        switch (text) {
            case '1':
                this.awaitingSpecialist = true;
                return { message: "🔔 Buscando especialistas disponíveis...", complete: false };
            case '2':
                this.state = "services";
                return { message: SimpleAI.servicesMenu.message, complete: false };
            case '3':
                this.state = "faq";
                return { message: SimpleAI.faqMenu.message, complete: false };
            case '4':
                this.state = "scheduling";
                this.currentStep = 1;
                return { message: "👤 Por favor, informe seu nome completo:", complete: false };
            case '5':
                this.state = "about";
                return { message: SimpleAI.aboutUsMenu.message, complete: false };
            case '6':
                this.state = "contact";
                return { message: SimpleAI.contactMenu.message, complete: false };
            case '7':
                this.resetState();
                return { message: "👋 Atendimento encerrado. Volte sempre!", complete: false };
            default:
                return { message: SimpleAI.mainMenu.message, complete: false };
        }
    }

    // ======================================
    // Fluxo de Agendamento
    // ======================================
    async handleSchedulingFlow(text) {
        switch (this.currentStep) {
            case 1: // Nome
                this.schedulingData.name = text;
                this.currentStep = 2;
                return { message: "📅 Informe a data (DD/MM/AAAA):", complete: false };
            
            case 2: // Data
                if (!this.isValidDate(text)) {
                    return { message: "❌ Formato inválido. Use DD/MM/AAAA:", complete: false };
                }
                this.schedulingData.date = text;
                this.currentStep = 3;
                return { message: "⏰ Informe o horário (HH:MM):", complete: false };
            
            case 3: // Horário
                if (!this.isValidTime(text)) {
                    return { message: "❌ Horário inválido. Use HH:MM:", complete: false };
                }
                this.schedulingData.time = text;
                this.currentStep = 4;
                return { message: "📧 Informe seu e-mail:", complete: false };
            
            case 4: // E-mail
                if (!this.isValidEmail(text)) {
                    return { message: "❌ E-mail inválido. Tente novamente:", complete: false };
                }
                this.schedulingData.email = text;
                this.currentStep = 5;
                return { message: "📝 Descreva o assunto da reunião:", complete: false };
            
            case 5: // Confirmação
                this.schedulingData.subject = text;
                return this.confirmScheduling();
            
            default:
                this.resetState();
                return { message: "❌ Erro no agendamento. Digite *menu*.", complete: false };
        }
    }

    async confirmScheduling() {
        try {
            await emailService.sendMeetingConfirmation(this.schedulingData, this.schedulingData.email);
            this.lastMeetingDetails = { ...this.schedulingData };
            this.resetState();
            
            return {
                message: "✅ Agendamento confirmado! Detalhes enviados por e-mail.",
                complete: true,
                meetingDetails: this.lastMeetingDetails
            };
        } catch (error) {
            console.error("Erro no agendamento:", error);
            return { message: "❌ Falha ao confirmar. Tente novamente.", complete: false };
        }
    }

    // ======================================
    // Utilitários
    // ======================================
    isValidDate(date) {
        return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    }

    isValidTime(time) {
        return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    resetState() {
        this.state = "main";
        this.currentStep = 0;
        this.schedulingData = {};
        this.awaitingSpecialist = false;
        this.termsAccepted = false; // Reset terms acceptance
    }
}

export default SimpleAI;