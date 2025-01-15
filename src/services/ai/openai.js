import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class AIService {
    static async processMessage(message) {
        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: message }],
                model: "gpt-3.5-turbo",
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error("Erro na API da OpenAI:", error);
            throw error;
        }
    }
}

export default AIService;
