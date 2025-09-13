import { GoogleGenerativeAI } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client"


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const prisma = new PrismaClient()
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const Preguntar = async (pregunta) => {

    const filas_datos = await prisma.sol.findMany({
        orderBy: {id: 'desc'}
    })

    const filas_conversacion = await prisma.chat.findMany({
        orderBy: {createdAt: 'asc'}
    })

    const contexto = filas_datos.map(fila => {
        return `Sol: ${fila.id}, Earth Date: ${fila.earthDate}, Min Temp: ${fila.minTemp}, Max Temp: ${fila.maxTemp}, Avg Temp: ${fila.avgTemp}, Wind Speed: ${fila.windSpeed}, Pressure: ${fila.pressure}, adicional: ${fila.rawJson}`
    }).join("\n")

    //aquí se da contexto para que no pierda el hilo de la conversación
    const conversacion = filas_conversacion.map(fila => {
        return `Pregunta: ${fila.question}, Respuesta: ${fila.answer}`
    }).join("\n")

    const prompt = `
    Eres un gentil asistente que responde preguntas y brinda ayuda sobre el contexto de Marte que se te es proporcionado por la NASA
    para responder a la pregunta de manera precisa y concisa y todo lo relacionado lo complementas.
    Si la información no está en el contexto, excusate por no saber sin hablar directamente de la información que se te proporcionó.
    Además, utiliza el siguiente historial de conversación para mantener el contexto: ${conversacion}.\n
    Aquí está el contexto principal: ${contexto}.\n\nPregunta: ${pregunta}\nRespuesta:`

    const result = await model.generateContent(prompt);

    await prisma.chat.create({
        data: {
            question: pregunta,
            answer: result.response.text()
        }
    })

    return result.response.text();
}