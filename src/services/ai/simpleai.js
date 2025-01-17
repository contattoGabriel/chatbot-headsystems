class SimpleAI {
    static responses = {
        saudacoes: {
            patterns: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'hi', 'hello'],
            replies: [
                'Olá! Sou o assistente virtual da Head Systems. Como posso ajudar?',
                'Olá! Seja bem-vindo à Head Systems. Em que posso ser útil?',
                'Oi! Estou aqui para ajudar com soluções em TI para sua empresa!'
            ]
        },
        servicos: {
            patterns: ['serviço', 'serviços', 'soluções', 'oferecem', 'fazem', 'trabalham', 'atuam'],
            replies: [
                'Oferecemos diversos serviços de TI:\n- Outsourcing de TI\n- Hardware\n- Virtualização\n- Segurança da informação\nSobre qual você quer saber mais?',
                'Na Head Systems, trabalhamos com:\n- Gestão e controle de sistemas de TI\n- Implementação de Data Centers\n- Virtualização\n- Segurança da informação\nQual área te interessa?'
            ]
        },
        outsourcing: {
            patterns: ['outsourcing', 'terceirização', 'gestão ti', 'suporte', 'help desk', 'monitoramento'],
            replies: [
                'Nosso serviço de Outsourcing de TI inclui:\n- Cibersegurança\n- Suporte técnico\n- Supervisão de fornecedores\n- Gestão de links, CFTV e telefonia',
                'Oferecemos terceirização completa da gestão de TI, garantindo segurança e qualidade nas operações.'
            ]
        },
        virtualizacao: {
            patterns: ['virtualização', 'virtual', 'citrix', 'vmware', 'hyper-v', 'servidor', 'cloud', 'nuvem'],
            replies: [
                'Trabalhamos com as principais soluções de virtualização:\n- Citrix\n- Microsoft Hyper-V\n- VMware\nReduzindo custos e aumentando a eficiência.',
                'Nossa expertise em virtualização permite executar vários servidores virtuais em um mesmo hardware, reduzindo custos e simplificando a gestão.'
            ]
        },
        seguranca: {
            patterns: ['segurança', 'firewall', 'backup', 'pentest', 'vulnerabilidade', 'lgpd', 'vírus', 'hacker', 'proteção'],
            replies: [
                'Nossos serviços de segurança incluem:\n- Backup/Restore\n- Firewall\n- Pentest\n- Análise de vulnerabilidades\n- Conformidade com LGPD',
                'Garantimos a segurança da sua informação com soluções completas de proteção e monitoramento.'
            ]
        },
        contato: {
            patterns: ['contato', 'telefone', 'email', 'endereço', 'localização', 'onde', 'falar', 'atendimento'],
            replies: [
                'Você pode nos contatar:\nTelefone: +55 31 3772-0172\nE-mail:contato@headsystems.com.br/\nSite:https://headsystems.com.br/',
                'Estamos disponíveis para atendê-lo:\nTel: +55 31 3772-0172\nE-mail:contato@headsystems.com.br'
            ]
        },
        despedida: {
            patterns: ['tchau', 'até mais', 'obrigado', 'obrigada', 'valeu', 'agradeço'],
            replies: [
                'Foi um prazer ajudar! Se precisar de mais informações, estamos à disposição!',
                'Agradeço seu contato! Estamos sempre à disposição para ajudar com soluções em TI!',
                'Até mais! Não hesite em nos contatar para qualquer necessidade em TI!'
            ]
        },
        orcamento: {
            patterns: ['orçamento', 'preço', 'valor', 'custo', 'investimento', 'quanto custa'],
            replies: [
                'Para fornecer um orçamento preciso, precisamos entender melhor suas necessidades. Por favor, entre em contato pelo telefone (31) 3772-0172 ou email contato@headsystems.com.br',
                'Cada projeto é único e personalizado. Vamos agendar uma conversa para entender suas necessidades?'
            ]
        },
        especialista: {
            patterns: ['falar', 'atendimento', 'especialista', 'consultor', 'consultoria', 'suporte', 'help desk', 'monitoramento', 'especialista', 'analista'],
            replies: [
                'Para falar com um especialista, entre em contato pelo telefone (31) 3772-0172 ou email contato@headsystems.com.br',
                'Vamos agendar uma conversa para entender suas necessidades? Entre em contato: (31) 3772-0172'
            ]
        }
    };

    static processMessage(message) {
        const text = message.toLowerCase().trim();
        
        // Verifica múltiplas categorias e combina respostas se necessário
        let matchedCategories = [];
        
        for (const [category, content] of Object.entries(this.responses)) {
            if (content.patterns.some(pattern => text.includes(pattern))) {
                matchedCategories.push(category);
            }
        }

        // Se encontrou múltiplas categorias, prioriza uma delas
        if (matchedCategories.length > 0) {
            const category = this.responses[matchedCategories[0]];
            return category.replies[Math.floor(Math.random() * category.replies.length)];
        }

        // Resposta padrão se nenhum padrão for encontrado
        return 'Olá! Sou o assistente virtual da Head Systems. Posso ajudar com informações sobre, Digite o que você precisa:\n\n' +
               '- Outsourcing de TI\n' +
               '- Virtualização\n' +
               '- Segurança da informação\n' +
               '- Orçamentos\n' +
               '- Fale com um especialista\n' +
               'Como posso te ajudar hoje?';
    }
}

export default SimpleAI;