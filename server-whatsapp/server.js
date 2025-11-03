import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import path from "path"
import { fileURLToPath } from "url"
import { chatbot } from "./chatbot.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROTO_PATH = path.join(__dirname, "proto", "whatsapp.proto")
const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const whatsappProto = grpc.loadPackageDefinition(packageDefinition).whatsapp

const server = new grpc.Server()

server.addService(whatsappProto.WhatsAppService.service, {
  SendMessage: async (call, callback) => {
    const { to, message } = call.request
    try {
      await chatbot.sendMessage(to, message)
      callback(null, { success: true, info: "Mensagem enviada com sucesso" })
    } catch (err) {
      callback(null, { success: false, info: err.message })
    }
  },

  GetStatus: (call, callback) => {
    const connected = chatbot.getStatus()
    callback(null, {
      connected,
      message: connected ? "Conectado" : "Desconectado",
    })
  },

  SubscribeToMessages: (call) => {
    console.log("🔔 Cliente conectado para receber mensagens")

    const unsubscribe = chatbot.onMessage((messageData) => {
      console.log(`📤 Enviando mensagem para cliente: ${messageData.from}`)
      call.write(messageData)
    })

    call.on("cancelled", () => {
      console.log("❌ Cliente desconectado")
      unsubscribe()
    })

    call.on("error", (err) => {
      console.error("Erro no stream:", err)
      unsubscribe()
    })
  },
})

const PORT = "0.0.0.0:50051"
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`🚀 Servidor gRPC rodando em ${PORT}`)
})
