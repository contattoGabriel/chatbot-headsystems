import emailService from '../email/mailservice.js';

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
            "4️⃣ 📅 Agendar Reunião\n" +
            "5️⃣ 📖 Sobre Nós\n" +
            "6️⃣ 📞 Contato\n" +
            "7️⃣ 🚪 Encerrar Conversa", // Atualizado com novas opções
        options: ['1', '2', '3', '4', '5', '6', '7'], // Opções ajustadas
    };

    static servicesMenu = {
        message: "🏢 Aqui estão os principais serviços que a *Head Systems* oferece:\n\n" +
            "🔹 *Outsourcing de TI*: Gestão completa de TI e suporte especializado.\n" +
            "🔹 *Virtualização*: Soluções Citrix, Microsoft e VMware para reduzir custos.\n" +
            "🔹 *Segurança da Informação*: Firewall, backup e conformidade LGPD.\n" +
            "🔹 *Pulsus MDM*: Monitoramento completo de dispositivos móveis e gerenciamento de dispositivos corporativos.\n\n" +
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
        this.state = "main";
        this.schedulingData = {};
        this.currentStep = 0;
        this.lastMeetingDetails = null;
        this.awaitingSpecialist = false;
    }

    processMessage(message) {
        if (!message || typeof message !== 'string') {
            return {
                message: "❌ Mensagem inválida. Por favor, tente novamente.",
                complete: false
            };
        }

        const text = message.toLowerCase().trim();

        if (!text) {
            return {
                message: SimpleAI.mainMenu.message,
                complete: false
            };
        }

        if (this.awaitingSpecialist) {
            return { message: "⏳ Aguarde enquanto verificamos a disponibilidade dos especialistas...", complete: false };
        }

        if (text === "menu") {
            this.resetState();
            return { message: SimpleAI.mainMenu.message, complete: false };
        }

        if (this.state === "main") {
            switch(text) {
                case '1':
                    this.awaitingSpecialist = true;
                    return { message: "🔔 Estamos verificando a disponibilidade dos especialistas. Por favor, aguarde.", complete: false };
                case '2':
                    this.state = "services";
                    return { message: SimpleAI.servicesMenu.message, complete: false };
                case '3':
                    this.state = "faq";
                    return { message: SimpleAI.faqMenu.message, complete: false };
                case '4':
                    this.state = "scheduling";
                    this.currentStep = 1;
                    return { message: "📅 Por favor, informe a data desejada para a reunião (ex: 25/12/2024):", complete: false };
                case '5': // Novo caso para "Sobre Nós"
                    this.state = "about";
                    return { message: SimpleAI.aboutUsMenu.message, complete: false };
                case '6': // Novo caso para "Contato"
                    this.state = "contact";
                    return { message: SimpleAI.contactMenu.message, complete: false };
                case '7': // Atualizado para encerrar
                    this.state = "end";
                    return { message: "👋 Obrigado por conversar com a Head Systems! Se precisar de algo, digite Menu e Fale com um de nossos Especialistas. 😊", complete: false };
                default:
                    return { message: SimpleAI.mainMenu.message, complete: false };
            }
        }

        if (this.state === "scheduling" && this.currentStep === 0) {
            this.currentStep = 1;
            return { message: "👤 Por favor, informe seu nome completo:", complete: false };
        }

        if (this.state === "scheduling") {
            return this.handleSchedulingFlow(text);
        }

        // Caso o usuário esteja em outros estados (como "about" ou "contact")
        return { message: "❌ Opção inválida. Digite 'menu' para voltar ao início.", complete: false };
    }

    async handleSchedulingFlow(text) {
        switch(this.currentStep) {
            case 1:
                this.schedulingData.name = text;
                this.currentStep = 2;
                return { message: "📅 Por favor, informe a data desejada para a reunião (ex: 25/12/2024):", complete: false };
            case 2:
                if (!this.isValidDate(text)) {
                    return { message: "❌ Data inválida. Por favor, informe no formato correto (ex: 25/12/2024):", complete: false };
                }
                if (!this.isFutureDate(text)) {
                    return { message: "❌ A data deve ser posterior ao dia atual. Por favor, informe uma data válida:", complete: false };
                }
                this.schedulingData.date = text;
                this.currentStep = 3;
                return { message: "⏰ Agora, informe o horário desejado (ex: 14:30):", complete: false };
            case 3:
                if (!this.isValidTime(text)) {
                    return { message: "❌ Horário inválido. Informe um horário válido (ex: 14:30):", complete: false };
                }
                if (!this.isValidDateTime(this.schedulingData.date, text)) {
                    return { message: "❌ O horário deve ser posterior ao horário atual para hoje. Por favor, informe um horário válido:", complete: false };
                }
                this.schedulingData.time = text;
                this.currentStep = 4;
                return { message: "📧 Informe seu e-mail para confirmação:", complete: false };
            case 4:
                if (!this.isValidEmail(text)) {
                    return { message: "❌ E-mail inválido. Informe um e-mail válido:", complete: false };
                }
                this.schedulingData.email = text;
                this.currentStep = 5;
                return { message: "📝 Informe o assunto da reunião:", complete: false };
            case 5:
                this.schedulingData.subject = text;
                this.currentStep = 6;
                return { 
                    message: `📝 Confirmação de Agendamento:\n\n` +
                             `👤 Nome: ${this.schedulingData.name}\n` +
                             `📆 Data: ${this.schedulingData.date}\n` +
                             `⏰ Horário: ${this.schedulingData.time}\n` +
                             `📧 E-mail: ${this.schedulingData.email}\n` +
                             `📝 Assunto: ${this.schedulingData.subject}\n\n` +
                             `Digite *confirmar* para finalizar ou *cancelar* para voltar ao menu.`,
                    complete: false 
                };
            case 6:
                if (text.toLowerCase() === 'confirmar') {
                    this.lastMeetingDetails = {...this.schedulingData};
                    const meetingDetails = this.lastMeetingDetails;
                    
                    try {
                        const emailSent = await emailService.sendMeetingConfirmation(
                            meetingDetails,
                            meetingDetails.email
                        );

                        this.resetState();
                        
                        if (emailSent) {
                            return {
                                message: "✅ Agendamento confirmado! Um email de confirmação foi enviado para você.\n" +
                                       "Se precisar de mais alguma coisa, digite *menu* para acessar outras informações.",
                                complete: true,
                                meetingDetails
                            };
                        } else {
                            return {
                                message: "✅ Agendamento confirmado! Porém houve um erro ao enviar o email de confirmação.\n" +
                                       "Nossa equipe entrará em contato em breve.\n" +
                                       "Digite *menu* para acessar outras informações.",
                                complete: true,
                                meetingDetails
                            };
                        }
                    } catch (error) {
                        console.error('Erro no agendamento:', error);
                        return {
                            message: "❌ Ocorreu um erro ao confirmar o agendamento. Por favor, tente novamente.",
                            complete: false
                        };
                    }
                } else if (text.toLowerCase() === 'cancelar') {
                    this.resetState();
                    return {
                        message: SimpleAI.mainMenu.message,
                        complete: false
                    };
                }
                return {
                    message: "❌ Opção inválida. Digite *confirmar* ou *cancelar*.",
                    complete: false
                };
            default:
                return {
                    message: "❌ Erro no fluxo de agendamento. Digite *menu* para recomeçar.",
                    complete: false
                };
        }
    }

    isFutureDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return inputDate >= today;
    }

    isValidDateTime(dateStr, timeStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        const [hours, minutes] = timeStr.split(':').map(Number);
        const inputDateTime = new Date(year, month - 1, day, hours, minutes);
        const now = new Date();
        return inputDateTime > now;
    }

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
    }
}

export default SimpleAI;