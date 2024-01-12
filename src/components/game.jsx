import "../styles/game.css"

export default function Game() {
  return (
    <>
      <div className="game-general-container">
        <div>
          <h2>Pregunta</h2>
          <div className="game-pregunta">
            <p>Quien mato a goliat</p>
          </div>
          <div>
            <button>Moises</button>
            <button>Salomon</button>
            <button>David</button>
          </div>
          <div>
            <p>Hola Juan</p>
            <p>tienes 76 puntos acumulados</p>
          </div>
        </div>
      </div>
    </>
  )
}
