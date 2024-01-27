import "../styles/game.css";
import React, { useEffect, useState } from "react";

export default function Game() {
  const [preguntas, setPreguntas] = useState([]);
  const [aidi, setAidi] = useState(null);
  const [puntos, setPuntos] = useState(() => {
    const storedPuntos = localStorage.getItem("puntos");
    return storedPuntos ? parseInt(storedPuntos, 10) : 10;
  });
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
  }, []);

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    if (storedNombre) {
      setNombre(storedNombre);
    } else {
      solicitarNombre();
    }

    const storedPuntos = localStorage.getItem("puntos");
    if (storedPuntos) {
      setPuntos(parseInt(storedPuntos, 10));
    }
  }, []); // Solo se ejecuta en el montaje inicial

  useEffect(() => {
    localStorage.setItem("puntos", puntos.toString());
  }, [puntos]); // Se ejecuta cada vez que puntos cambie

  const solicitarNombre = () => {
    const nuevoNombre = window.prompt("Ingresa tu nombre:");
    setNombre(nuevoNombre || "");
    localStorage.setItem("nombre", nuevoNombre || "");
  };

  const changeAidi = () => {
    setAidi(Math.floor(Math.random() * preguntas.length));
  };

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

  const borrarLocalStorage = () => {
    localStorage.removeItem("nombre");
    localStorage.removeItem("puntos");
    setNombre("");
    setPuntos(10); // o el valor por defecto que desees
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
            <p>Tienes {puntos} puntos acumulados</p>
            <button className="game-button-2" onClick={borrarLocalStorage}>Borrar datos del jugador</button>
          </div>
        </div>
      </div>
    </div>
  );
}
