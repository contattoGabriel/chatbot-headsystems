import { Client, LocalAuth } from "whatsapp-web.js";
const qrcode = require("qrcode-terminal");

class WhatsAppService {
  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox"],
      },
    });

    this.initializeClient();
  }

  initializeClient() {
    // Evento de QR Code
    this.client.on("qr", (qr) => {
      console.log("QR Code recebido, escaneie-o no WhatsApp:");
      qrcode.generate(qr, { small: true });
    });

    // Evento de pronto
    this.client.on("ready", () => {
      console.log("Cliente WhatsApp está pronto!");
    });

    // Evento de mensagem
    this.client.on("message", async (message) => {
      try {
        await this.handleMessage(message);
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
      }
    });

    // Inicializar cliente
    this.client.initialize();
  }

  async handleMessage(message) {
    // Implementação do processamento de mensagem
    console.log("Mensagem recebida:", message.body);
  }
}

module.exports = new WhatsAppService();
