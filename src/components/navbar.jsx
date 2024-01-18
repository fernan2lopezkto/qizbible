import "../styles/navbar.css"

export default function NavBar() {
  return (
    <div className="navb">
      <a href="#root" className="nav-principal-link">BQ</a>
      <div className="nav-links-container">
        <a href="#game-section" className="nav-other-link">Juego</a>
        <a href="#reglas" className="nav-other-link">Reglas</a>
        <a href="#footer" className="nav-other-link">Contacto</a>
      </div>
    </div>
  )
}