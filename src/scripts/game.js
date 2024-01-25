
// Importa React y cualquier otro módulo que necesites

// Función para cargar las preguntas desde el archivo JSON
const cargarPreguntas = async () => {
    try {
      // Ruta al archivo JSON local
      const rutaJSON = './preguntas.json';
  
      // Realiza la solicitud para obtener el archivo JSON
      const respuesta = await fetch(rutaJSON);
  
      // Verifica si la solicitud fue exitosa (código 200)
      if (respuesta.ok) {
        // Convierte la respuesta a formato JSON
        const preguntas = await respuesta.json();
  
        // Ahora puedes trabajar con el objeto de preguntas
        console.log(preguntas);
  
        // Puedes almacenar este objeto de preguntas en el estado de tu componente React o hacer cualquier otra operación necesaria
      } else {
        console.error('Error al cargar el archivo JSON');
      }
    } catch (error) {
      console.error('Error al cargar el archivo JSON', error);
    }
  };
  
  // Llama a la función para cargar las preguntas cuando sea necesario
  cargarPreguntas();
  