import "../styles/reglas.css"

export default function Reglas() {
    return (
        <>
            <div className="reglas-container" id="reglas">
                <div>
                    <h2 className="reglas-titulo"> Reglas </h2>
                    <p>
                    aparece una pregunta al azar con tres opciones de respuesta, el jugador debera presionar el boton con la opcion que crea correcta, si se equivoca le aparecera un pequeño mensaje y se le restaran 2 puntos, si acierta, aparecera un mensaje, se le sumaran 5 puntos y se avanzara a una nueva pregunta tambien al azar.

                    </p>
                </div>
            </div>
        </>
    )
}