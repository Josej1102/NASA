import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Controlador para mostrar historial de chat
export async function getChatHistory(req, res) {
    try{
        const chats = await prisma.chat.findMany({ orderBy: { createdAt: "asc" } });
        res.json(chats);
    }catch(error){
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Error fetching chat history" });
    }
}
