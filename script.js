// =====================================
//           Variables de Estado
// =====================================
let preguntas = [];
let aidiActual = null;
let puntos = parseInt(localStorage.getItem("puntos") || 10);
let nombre = localStorage.getItem("nombre") || "";
let helpUsed = false; // NUEVA variable de estado

// =====================================
//           Elementos del DOM
// =====================================
const preguntaTexto = document.getElementById('pregunta-texto');
const referenciaBiblica = document.getElementById('referencia-biblica');
const opcionesContainer = document.getElementById('opciones-container');
const playerGreeting = document.getElementById('player-greeting');
const puntosAcumuladosSpan = document.getElementById('puntos-acumulados');
const borrarDatosBtn = document.getElementById('borrar-datos-btn');
const helpButton = document.getElementById('help-button'); // NUEVO elemento
const gameSection = document.getElementById('game-section');
const rulesSection = document.getElementById('rules-section');
const navLinks = document.querySelectorAll('nav a');


// =====================================
//           Funciones de Utilidad
// =====================================

/** Muestra un toast/alerta temporal */
function showToast(message, isSuccess = true, isWarning = false) {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '8px';
    
    if (isWarning) {
        toast.style.backgroundColor = 'var(--color-alerta-warning)';
        toast.style.color = 'var(--color-texto-principal)';
    } else {
        toast.style.backgroundColor = isSuccess ? 'var(--color-alerta-success)' : 'var(--color-alerta-error)';
        toast.style.color = 'white';
    }
    
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

/** Carga las preguntas del archivo JSON */
async function obtenerPreguntas() {
    try {
        const respuesta = await fetch('preguntas.json');
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const preguntasJson = await respuesta.json();
        preguntas = preguntasJson;
        
        if (preguntas.length > 0) {
            changeAidi();
        } else {
            preguntaTexto.textContent = "El archivo preguntas.json está vacío.";
            opcionesContainer.innerHTML = '';
        }
    } catch (error) {
        console.error('Error al cargar el archivo JSON', error);
        preguntaTexto.textContent = `Error al cargar preguntas: ${error.message}. Asegúrate de que 'preguntas.json' está en la carpeta correcta.`;
        opcionesContainer.innerHTML = '';
    }
};

/** Actualiza el DOM con la nueva pregunta */
function renderPregunta() {
    if (!preguntas || preguntas.length === 0 || aidiActual === null) {
        preguntaTexto.textContent = "No hay preguntas disponibles.";
        opcionesContainer.innerHTML = '';
        referenciaBiblica.textContent = '';
        return;
    }

    // Reinicia el estado de ayuda y visibilidad de referencia
    helpUsed = false;
    helpButton.disabled = false;
    referenciaBiblica.style.display = 'none'; 
    
    const pregunta = preguntas[aidiActual];
    preguntaTexto.textContent = pregunta.pregunta;
    referenciaBiblica.textContent = ''; 
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

/** Selecciona una pregunta al azar y la renderiza */
function changeAidi() {
    if (preguntas.length > 0) {
        aidiActual = Math.floor(Math.random() * preguntas.length);
        renderPregunta();
    }
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

/** Muestra la referencia bíblica y marca la ayuda como usada */
function useHelp() {
    if (helpUsed) return; // Evita usar la ayuda más de una vez
    
    const pregunta = preguntas[aidiActual];
    referenciaBiblica.textContent = `Referencia: ${pregunta.refBiblica}`;
    referenciaBiblica.style.display = 'block'; // Muestra la referencia
    helpButton.disabled = true; // Deshabilita el botón de ayuda
    helpUsed = true; // Marca que se usó la ayuda
    showToast("Referencia revelada. Puntuación de acierto reducida a +3.", false, true); // Advertencia
}

/** Chequea la respuesta seleccionada */
function checkAnswer(boton) {
    const pregunta = preguntas[aidiActual];
    
    // Muestra la referencia bíblica si no se ha usado ayuda (o si es incorrecta)
    if (!helpUsed) {
        referenciaBiblica.textContent = `Referencia: ${pregunta.refBiblica}`;
    }
    referenciaBiblica.style.display = 'block';
    
    // Deshabilita todos los botones para finalizar la ronda
    document.querySelectorAll('.game-button').forEach(btn => btn.disabled = true);
    helpButton.disabled = true;


    if (boton === pregunta.correcta) {
        // Correcto
        let puntosGanados = helpUsed ? 3 : 5;
        puntos += puntosGanados;
        showToast(`¡Correcto! Sumas ${puntosGanados} puntos.`, true);
        
        // Espera un poco antes de cambiar de pregunta
        setTimeout(() => {
            updatePlayerInfo();
            changeAidi();
        }, 1500);
        
    } else {
        // Incorrecto
        puntos -= 2;
        showToast("Incorrecto. Pierdes 2 puntos.", false);
        updatePlayerInfo(); // Actualiza puntos inmediatamente
        
        // Si es incorrecto, no avanzamos, pero mantenemos deshabilitado para que vea la referencia
    }
}

/** Solicita el nombre si no existe */
function solicitarNombre() {
    if (!nombre || nombre === "Jugador Anónimo") {
        const nuevoNombre = window.prompt("Ingresa tu nombre:");
        nombre = nuevoNombre ? nuevoNombre.trim() : "";
        if (nombre) {
            localStorage.setItem("nombre", nombre);
        } else {
            nombre = "Jugador Anónimo";
        }
        updatePlayerInfo();
    }
}

/** Borra los datos del jugador */
function borrarLocalStorage() {
    if (confirm("¿Estás seguro de que deseas borrar tu nombre y puntos?")) {
        localStorage.removeItem("nombre");
        localStorage.removeItem("puntos");
        nombre = "";
        puntos = 10;
        solicitarNombre(); // Vuelve a solicitar el nombre
        updatePlayerInfo();
        showToast("Datos borrados. Puntos reiniciados a 10.", true);
    }
}

/** Controla la visibilidad de las secciones y el estado de la navegación */
function navigate(sectionId) {
    gameSection.style.display = 'none';
    rulesSection.style.display = 'none';
    
    if(document.getElementById(sectionId)) {
        document.getElementById(sectionId).style.display = 'block';
    }

    navLinks.forEach(link => link.classList.remove('active'));
    const targetLink = document.querySelector(`nav a[href*="#${sectionId.split('-')[0]}"]`);
    if(targetLink) {
        targetLink.classList.add('active');
    }
}

// =====================================
//           Inicialización
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carga los datos del jugador y solicita el nombre
    updatePlayerInfo(); 
    solicitarNombre();
    
    // 2. Carga las preguntas del JSON
    obtenerPreguntas();
    
    // 3. Asigna eventos
    borrarDatosBtn.addEventListener('click', borrarLocalStorage);
    helpButton.addEventListener('click', useHelp); // Evento para el botón de ayuda
    

    // 4. Configura navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHref = link.getAttribute('href').substring(1);
            const sectionId = targetHref === 'footer' ? 'footer' : (targetHref === 'rules-section' ? 'rules-section' : 'game-section');

            if (sectionId === 'footer') {
                document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
            } else {
                navigate(sectionId);
                document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navega a la sección de juego por defecto al cargar
    navigate('game-section');
});
