import express from "express";
import dotenv from "dotenv";
import fetchRoutes from "./routes/fetchRoutes.js";
import preguntaIARoutes from './routes/PreguntaIA.js';

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rutas de fetchNasa
app.use('/api', fetchRoutes)
// Rutas de PreguntaIA
app.use('/api', preguntaIARoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});