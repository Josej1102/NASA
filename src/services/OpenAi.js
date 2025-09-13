import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client"


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const prisma = new PrismaClient()
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const Preguntar = async (pregunta) => {

    const filas = await prisma.sol.findMany({
        orderBy: {id: 'desc'}
    })

    const contexto = filas.map(fila => {
        return `Sol: ${fila.id}, Earth Date: ${fila.earthDate}, Min Temp: ${fila.minTemp}, Max Temp: ${fila.maxTemp}, Avg Temp: ${fila.avgTemp}, Wind Speed: ${fila.windSpeed}, Pressure: ${fila.pressure}`
    }).join("\n")

    const prompt = `
    Eres un asistente que responde preguntas sobre el contexto de Marte que se te es proporcionado por la NASA.
    Utiliza el siguiente contexto para responder a la pregunta de manera precisa y concisa (complementa lo relacionado).
    Si la información no está en el contexto, excusate por no saber sin hablar directamente de la información que se te proporcionó. contexto: ${contexto}.\n\nPregunta: ${pregunta}\nRespuesta:`

    const result = await model.generateContent(prompt);
    return result.response.text();
}