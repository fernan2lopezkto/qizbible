import React, { useState, useEffect } from "react";
import "../styles/game.css";

export default function Game() {
  // Estado para almacenar preguntas y respuestas
  const [preguntas, setPreguntas] = useState([]);
  // Estado para el índice de la pregunta actual
  const [indicePregunta, setIndicePregunta] = useState(0);
  // Estado para el puntaje del jugador
  const [puntaje, setPuntaje] = useState(0);
  // Estado para el nombre del jugador
  const [nombreJugador, setNombreJugador] = useState(
    localStorage.getItem("nombreJugador") || ""
  );

  // Función para cargar las preguntas desde el archivo JSON
  const cargarPreguntas = async () => {
    try {
      const rutaJSON = "../scripts/preguntas.json";
      const respuesta = await fetch(rutaJSON);
      console.log(respuesta);

      if (respuesta.ok) {
        const preguntasJson = await respuesta.json();
        setPreguntas(preguntasJson);
      } else {
        console.error("Error al cargar el archivo JSON");
      }
    } catch (error) {
      console.error("Error al cargar el archivo JSON", error);
    }
  };

  // Función para manejar la selección de una respuesta
  const manejarRespuesta = (indiceRespuesta) => {
    const preguntaActual = preguntas[indicePregunta];

    if (indiceRespuesta === preguntaActual.correcta) {
      // Respuesta correcta, suma 5 puntos
      setPuntaje((prevPuntaje) => prevPuntaje + 5);
      window.alert("¡Excelente! Acertaste. Sumas 5 puntos más.");
    } else {
      // Respuesta incorrecta
      window.alert("Lo siento, te equivocaste.");
    }

    // Avanza al siguiente índice de pregunta
    setIndicePregunta((prevIndice) => prevIndice + 1);
  };

  // Función para manejar la entrada del nombre del jugador
  const manejarNombreChange = (event) => {
    setNombreJugador(event.target.value);
  };

  // Función para manejar el envío del formulario (nombre del jugador)
  const manejarFormularioSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("nombreJugador", nombreJugador);
  };

  // Cargar preguntas al montar el componente
  useEffect(() => {
    cargarPreguntas();
  }, []);

  // Verificar si es la primera vez que se abre la aplicación
  const esPrimeraVez = !localStorage.getItem("nombreJugador");

  return (
    <div id="game-section" className="separacion">
      <div className="game-general-container">
        {esPrimeraVez ? (
          // Preguntar el nombre del jugador si es la primera vez
          <form onSubmit={manejarFormularioSubmit}>
            <label>
              Ingresa tu nombre:
              <input
                type="text"
                value={nombreJugador}
                onChange={manejarNombreChange}
              />
            </label>
            <button type="submit">Empezar</button>
          </form>
        ) : (
          // Mostrar el juego si ya se ingresó el nombre
          <div>
            <h2>Pregunta</h2>
            <div className="game-pregunta">
              <p>{preguntas[indicePregunta]?.pregunta}</p>
            </div>
            <div className="game-button-container">
              {preguntas[indicePregunta]?.opciones.map((opcion, index) => (
                <button
                  key={index}
                  className="game-button"
                  type="button"
                  onClick={() => manejarRespuesta(index)}
                >
                  {opcion}
                </button>
              ))}
            </div>
            <div>
              <p>Hola {nombreJugador}</p>
              <p>Tienes {puntaje} puntos acumulados</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

