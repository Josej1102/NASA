import { Preguntar } from "../services/OpenAi.js";

export const PreguntarOpenAi = async (req, res) => {

    try {
        const { pregunta } = req.body;
        if (!pregunta) {
            return res.status(400).json({ error: "La pregunta es requerida" });
        }

        const respuesta = await Preguntar(pregunta);
        res.status(200).json({respuesta} );
    } catch (error) {
        console.error("Error en PreguntarOpenAi:", error);
        res.status(500).json({ error: "Error al procesar la pregunta" });
    }


}