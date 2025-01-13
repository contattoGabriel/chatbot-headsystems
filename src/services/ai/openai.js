import { Configuration, OpenAIApi } from "openai";

require("dotenv").config();

class AIService {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async processMessage(message) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Você é um assistente útil que ajuda com dúvidas sobre boletos e notas fiscais.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      });

      return completion.data.choices[0].message.content;
    } catch (error) {
      console.error("Erro no processamento da IA:", error);
      throw error;
    }
  }

  async classifyIntent(message) {
    // Implementar classificação de intenção
    // Exemplo: identificar se é pedido de boleto, nota fiscal, etc.
  }
}

module.exports = new AIService();
