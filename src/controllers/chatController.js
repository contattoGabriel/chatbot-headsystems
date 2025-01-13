import AIService from "../services/ai/openai";
const User = require("../models/User");
const Chat = require("../models/Chat");

class ChatController {
  async processMessage(message) {
    try {
      // Encontrar ou criar usuário
      const [user] = await User.findOrCreate({
        where: { phoneNumber: message.from },
        defaults: { name: "Unknown" },
      });

      // Processar mensagem com IA
      const aiResponse = await AIService.processMessage(message.body);

      // Salvar conversa
      await Chat.create({
        userId: user.id,
        message: message.body,
        response: aiResponse,
      });

      return aiResponse;
    } catch (error) {
      console.error("Erro no processamento:", error);
      throw error;
    }
  }
}

module.exports = new ChatController();
