// =====================================
//           Variables de Estado
// =====================================
let todasLasPreguntas = [];
let colaDePreguntas = []; // === NUEVO: Un array ordenado con las preguntas a jugar
let indicePreguntaActual = 0; // === NUEVO: Para saber qué pregunta de la cola toca
let puntos = parseInt(localStorage.getItem("puntos") || 10);
let nombre = localStorage.getItem("nombre") || "";
let helpUsed = false;

// =====================================
//           Elementos del DOM
// =====================================
const preguntaTexto = document.getElementById('pregunta-texto');
const referenciaBiblica = document.getElementById('referencia-biblica');
const opcionesContainer = document.getElementById('opciones-container');
const playerGreeting = document.getElementById('player-greeting');
const puntosAcumuladosSpan = document.getElementById('puntos-acumulados');
const borrarDatosBtn = document.getElementById('borrar-datos-btn');
const helpButton = document.getElementById('help-button');
const gameSection = document.getElementById('game-section');
const rulesSection = document.getElementById('rules-section');
const navLinks = document.querySelectorAll('nav a');


// =====================================
//           Funciones de Utilidad
// =====================================

/** Muestra un toast/alerta temporal */
function showToast(message, isSuccess = true) {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '8px';
    toast.style.backgroundColor = isSuccess ? 'var(--color-alerta-success)' : 'var(--color-alerta-error)';
    toast.style.color = 'white';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    toast.style.transition = 'opacity 0.5s ease-in-out, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(100%)';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

// === NUEVA LÓGICA: Para ordenar el juego por dificultad ===
async function obtenerYOrganizarPreguntas() {
    try {
        const respuesta = await fetch('preguntas.json');
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        todasLasPreguntas = await respuesta.json();
        
        if (todasLasPreguntas.length === 0) {
            preguntaTexto.textContent = "El archivo preguntas.json está vacío.";
            opcionesContainer.innerHTML = '';
            return;
        }

        // 1. Separamos las preguntas por dificultad
        const faciles = todasLasPreguntas.filter(p => p.dificultad === 'facil');
        const normales = todasLasPreguntas.filter(p => p.dificultad === 'normal');
        const dificiles = todasLasPreguntas.filter(p => p.dificultad === 'dificil');

        // 2. Función para barajar (mezclar) un array
        function barajarArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        barajarArray(faciles);
        barajarArray(normales);
        barajarArray(dificiles);

        // 3. Creamos la cola de juego en el orden: Difícil -> Normal -> Fácil
        colaDePreguntas = [...dificiles, ...normales, ...faciles];
        
        // 4. Empezamos el juego
        cargarSiguientePregunta();

    } catch (error) {
        console.error('Error al cargar y organizar el archivo JSON', error);
        preguntaTexto.textContent = `Error al cargar preguntas: ${error.message}.`;
        opcionesContainer.innerHTML = '';
    }
};

/** Actualiza el DOM con la pregunta actual */
function renderPregunta(pregunta) {
    if (!pregunta) {
        preguntaTexto.textContent = "No hay más preguntas disponibles.";
        opcionesContainer.innerHTML = '';
        return;
    }

    // Reinicia el estado de ayuda y visibilidad de elementos
    helpUsed = false;
    helpButton.disabled = false;
    helpButton.style.display = 'block';
    referenciaBiblica.style.display = 'none'; 
    
    preguntaTexto.textContent = pregunta.pregunta;
    opcionesContainer.innerHTML = ''; 

    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'game-button';
        boton.textContent = opcion;
        const respuestaIndex = index + 1;
        boton.addEventListener('click', () => checkAnswer(respuestaIndex)); 
        opcionesContainer.appendChild(boton);
    });
}

// === NUEVA LÓGICA: Carga la siguiente pregunta de la cola ===
function cargarSiguientePregunta() {
    // Si ya no hay más preguntas en la cola
    if (indicePreguntaActual >= colaDePreguntas.length) {
        preguntaTexto.textContent = "¡Felicitaciones! Has completado todas las preguntas. ¡Gloria a Dios por tu esfuerzo!";
        opcionesContainer.innerHTML = '';
        helpButton.style.display = 'none';
        referenciaBiblica.style.display = 'none';
        return;
    }

    // Verificamos si hay un cambio de dificultad para dar el premio
    if (indicePreguntaActual > 0) {
        const preguntaActual = colaDePreguntas[indicePreguntaActual];
        const preguntaAnterior = colaDePreguntas[indicePreguntaActual - 1];
        if (preguntaActual.dificultad !== preguntaAnterior.dificultad) {
            notificarCambioDificultad(preguntaActual.dificultad);
        }
    }

    const pregunta = colaDePreguntas[indicePreguntaActual];
    renderPregunta(pregunta);
    indicePreguntaActual++;
}


/** Actualiza los datos del jugador en el DOM y localStorage */
function updatePlayerInfo() {
    playerGreeting.textContent = `Hola ${nombre || 'jugador'}`;
    puntosAcumuladosSpan.textContent = puntos;
    localStorage.setItem("puntos", puntos.toString());
    localStorage.setItem("nombre", nombre);
}

// =====================================
//           Lógica del Juego
// =====================================

// === NUEVA LÓGICA: Popup que avisa el cambio de nivel y da puntos ===
function notificarCambioDificultad(nuevaDificultad) {
    const dificultadTexto = {
        normal: "normales",
        facil: "fáciles"
    };
    const mensaje = `¡Gloria a Dios por tu avance! Has superado el nivel anterior.\n\nAhora vienen las preguntas ${dificultadTexto[nuevaDificultad]}.\n\n¡Recibes 50 puntos de bendición!`;
    
    puntos += 50;
    updatePlayerInfo();
    
    // Usamos un alert simple como pediste
    alert(mensaje);
}

/** Muestra la referencia bíblica y marca la ayuda como usada */
function useHelp() {
    if (helpUsed) return;
    
    const preguntaActual = colaDePreguntas[indicePreguntaActual - 1];
    referenciaBiblica.textContent = `Referencia: ${preguntaActual.refBiblica}`;
    referenciaBiblica.style.display = 'block';
    
    helpButton.style.display = 'none'; 
    helpUsed = true;
}

/** Chequea la respuesta seleccionada */
function checkAnswer(boton) {
    const preguntaActual = colaDePreguntas[indicePreguntaActual - 1];
    
    referenciaBiblica.textContent = `Referencia: ${preguntaActual.refBiblica}`;
    referenciaBiblica.style.display = 'block';
    
    document.querySelectorAll('.game-button').forEach(btn => btn.disabled = true);
    helpButton.style.display = 'none';

    let tiempoEspera = 2000;

    if (boton === preguntaActual.correcta) {
        let puntosGanados = helpUsed ? 3 : 5;
        puntos += puntosGanados;
        showToast(`¡Correcto! Sumas ${puntosGanados} puntos.`, true);
    } else {
        puntos -= 2;
        showToast("Incorrecto. Pierdes 2 puntos.", false);
        tiempoEspera = 2500; // Más tiempo para leer la referencia en el error
    }
    
    updatePlayerInfo();
        
    setTimeout(() => {
        cargarSiguientePregunta();
    }, tiempoEspera);
}

/** Solicita el nombre si no existe */
function solicitarNombre() {
    if (!nombre || nombre === "Jugador Anónimo") {
        const nuevoNombre = window.prompt("¡Bendiciones! Ingresa tu nombre para empezar:");
        nombre = nuevoNombre ? nuevoNombre.trim() : "Anónimo";
        if (nombre) {
            localStorage.setItem("nombre", nombre);
        }
        updatePlayerInfo();
    }
}

/** Borra los datos del jugador */
function borrarLocalStorage() {
    if (confirm("¿Estás seguro de que deseas borrar tu nombre y puntos? Se reiniciará el juego.")) {
        localStorage.removeItem("nombre");
        localStorage.removeItem("puntos");
        window.location.reload(); // Recargamos la página para reiniciar todo
    }
}

/** Controla la visibilidad de las secciones y el estado de la navegación */
function navigate(sectionId) {
    gameSection.style.display = 'none';
    rulesSection.style.display = 'none';
    
    const sectionElement = document.getElementById(sectionId);
    if(sectionElement) {
        sectionElement.style.display = 'block';
    }

    navLinks.forEach(link => link.classList.remove('active'));
    // Buscamos el link que apunte a la sección, incluyendo el caso de "juego" que es game-section
    const targetLink = document.querySelector(`nav a[href*="${sectionId.split('-')[0]}"]`);
    if(targetLink) {
        targetLink.classList.add('active');
    }
}

// =====================================
//           Inicialización
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    updatePlayerInfo(); 
    solicitarNombre();
    
    // === CAMBIO: Llamamos a la nueva función que organiza todo
    obtenerYOrganizarPreguntas();
    
    borrarDatosBtn.addEventListener('click', borrarLocalStorage);
    helpButton.addEventListener('click', useHelp);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHref = link.getAttribute('href').substring(1);

            if (targetHref === 'footer') {
                 document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
                 return; 
            } 
            
            const sectionId = targetHref.includes('rules') ? 'rules-section' : 'game-section';
            navigate(sectionId);
        });
    });

    navigate('game-section');
});
