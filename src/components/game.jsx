import "../styles/game.css";
import React, { useEffect, useState } from "react";

export default function Game() {
  const [preguntas, setPreguntas] = useState([]);
  const [aidi, setAidi] = useState(null);
  const [puntos, setPuntos] = useState(10);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const respuesta = await fetch('preguntas.json');
        const preguntasJson = await respuesta.json();
        setPreguntas(preguntasJson);
        setAidi(Math.floor(Math.random() * preguntasJson.length));

    
      } catch (error) {
        console.error('Error al cargar el archivo JSON', error);
      }
    };

    obtenerPreguntas();

    const nuevoNombre = window.prompt("Ingresa tu nombre:");
    setNombre(nuevoNombre || "");  // Si el usuario presiona "Cancelar", se establece un nombre vacío.
  }, []);

  const changeAidi = () => {
    setAidi(Math.floor(Math.random() * preguntas.length));
  }

  const chekAnswer = (boton) => {
    if (boton === preguntas[aidi].correcta) {
      window.alert("correcto " + nombre + "!!! \n sumas 5 puntos");
      setPuntos(puntos + 5);
      console.log(puntos);
      changeAidi();
    } else {
      window.alert("incorrecto");
      setPuntos(puntos - 2);
      console.log(puntos);
    }
    
  };

  return (
    <div id="game-section" className="separacion">
      <div className="game-general-container">
        <div>
          <h2>Pregunta</h2>
          <div className="game-pregunta">
            <p>{preguntas && preguntas[aidi] && preguntas[aidi].pregunta}</p>
          </div>
          <div className="game-button-container">
            <button className="game-button" onClick={() => chekAnswer(1)}>
              {preguntas && preguntas[aidi] && preguntas[aidi].opciones[0]}
            </button>
            <button className="game-button" onClick={() => chekAnswer(2)}>
              {preguntas && preguntas[aidi] && preguntas[aidi].opciones[1]}
            </button>
            <button className="game-button" onClick={() => chekAnswer(3)}>
              {preguntas && preguntas[aidi] && preguntas[aidi].opciones[2]}
            </button>
          </div>
          <div>
            <p>Hola {nombre}</p>
            <p>tienes {puntos} puntos acumulados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
