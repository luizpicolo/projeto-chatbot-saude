import pkg from "whatsapp-web.js"
import qrcode from "qrcode-terminal"

const { Client, LocalAuth } = pkg

class ChatBotWhatsApp {
  constructor() {
    this.userStates = {}
    this.isReady = false
    this.messageListeners = []

    this.client = new Client({
      authStrategy: new LocalAuth({ dataPath: "sessions" }),
      puppeteer: {
        executablePath: "/usr/bin/chromium",
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-extensions",
          "--disable-gpu",
          "--single-process",
          "--no-zygote",
        ],
      },
    })

    this.client.on("qr", (qr) => qrcode.generate(qr, { small: true }))
    this.client.on("ready", () => {
      this.isReady = true
      console.log("✅ API WHATSAPP CONECTADA!")
    })

    this.client.on("message", async (msg) => {
      console.log(`📩 Mensagem recebida de ${msg.from}: ${msg.body}`)

      const messageData = {
        from: msg.from,
        message: msg.body,
        timestamp: new Date(msg.timestamp * 1000).toISOString(),
        messageId: msg.id._serialized,
      }

      this.messageListeners.forEach((listener) => {
        try {
          listener(messageData)
        } catch (err) {
          console.error("Erro ao notificar listener:", err)
        }
      })

      if (msg.body === "!ping") {
        msg.reply("pong")
      }
    })

    this.client.initialize()
  }

  onMessage(callback) {
    this.messageListeners.push(callback)
    return () => {
      const index = this.messageListeners.indexOf(callback)
      if (index > -1) {
        this.messageListeners.splice(index, 1)
      }
    }
  }

  async sendMessage(to, message) {
    if (!this.isReady) {
      throw new Error("WhatsApp client not ready")
    }
    const chatId = to.includes("@c.us") ? to : `${to}@c.us`
    await this.client.sendMessage(chatId, message)
    return true
  }

  getStatus() {
    return this.isReady
  }
}

export const chatbot = new ChatBotWhatsApp()
