import "../styles/game.css"

export default function Game() {
  return (
      <div id="game-section" className="separacion">
        <div className="game-general-container">
          <div>
            <h2>Pregunta</h2>
            <div className="game-pregunta">
              <p>Quien mato a goliat</p>
            </div>
            <div className="game-button-container">
              <button className="game-button" type="button" onClick={() => window.alert('Lo siento, te equivocaste')}>Moises</button>
              <button className="game-button" onClick={() => window.alert('Lo siento, te equivocaste')}>Salomon</button>
              <button className="game-button" onClick={() => window.alert('Exelente!! Acertaste. Sumas 5 puntos mas!!')}>David</button>
            </div>
            <div>
              <p>Hola Juan</p>
              <p>tienes 76 puntos acumulados</p>
            </div>
          </div>
        </div>
      </div>
  )
}
