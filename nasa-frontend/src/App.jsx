import { useState } from "react";
import "./app.css";

function App() {
  const [pregunta, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:3000/api/preguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta }),
      });
      const data = await res.json();
      setAnswer(data.respuesta || "Sin respuesta.");
    } catch (err) {
      console.error(err);
      setAnswer("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
    <div className="mars" aria-hidden="true"></div>          {/* elemento decorativo */}
    <div className="panel">
      <h1 className="title">NASA IA 🚀🪐</h1>

      <input
        className="input"
        type="text"
        value={pregunta}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Escribe tu pregunta sobre Marte..."
      />

      <div className="actions">
        <button className="btn" onClick={ask} disabled={loading}>
          {loading ? "Preguntando..." : "Preguntar"}
        </button>
      </div>

      <pre className="output">{answer}</pre>
    </div>

    <div className="vignette" aria-hidden="true"></div>
  </div>
  );
}

export default App;
