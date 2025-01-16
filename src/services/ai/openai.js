import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class AIService {
    static async processMessage(message) {
        try {
            if (!process.env.OPENAI_API_KEY) {
                throw new Error('Chave da API OpenAI não configurada');
            }

            console.log('Iniciando processamento com OpenAI');
            console.log('Usando chave:', process.env.OPENAI_API_KEY.substring(0, 5) + '...');
            
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: message }],
                model: "gpt-3.5-turbo",
            });

            if (!completion.choices || !completion.choices[0]) {
                throw new Error('Resposta inválida da OpenAI');
            }

            console.log('Resposta da OpenAI recebida com sucesso');
            return completion.choices[0].message.content;
        } catch (error) {
            console.error("Erro detalhado na API da OpenAI:", error);
            console.error("Mensagem de erro:", error.message);
            if (error.response) {
                console.error("Dados do erro:", error.response.data);
            }
            throw error;
        }
    }
}

export default AIService;
