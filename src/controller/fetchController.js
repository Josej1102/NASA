import { fetchNasa } from "../services/fetchNasa.js";

export const getNasaData = async (req, res) => {
  try {
    await fetchNasa();
    res.status(200).send("NASA data Cargada y actualizada exitosamente.");
    } catch (error) {   
    console.error("Error en fetchController:", error);
    res.status(500).send("Error cargando NASA data.");
  }
};