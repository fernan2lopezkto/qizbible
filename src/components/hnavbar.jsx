import React, { useEffect } from 'react';
import "../styles/hnavbar.css"

export default function Hnavbar() {
  useEffect(() => {
    const links = document.querySelectorAll('.link');

    const closeMenu = () => {
      const miCheckbox = document.getElementById('menu_hamburguesa');
      miCheckbox.checked = false;
    };

    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    return () => {
      // Limpia los event listeners al desmontar el componente
      links.forEach(link => {
        link.removeEventListener('click', closeMenu);
      });
    };
  }, []); // El segundo parámetro [] garantiza que el efecto se ejecute solo una vez al montar el componente

  return (
    <header className="header">
        <nav className="navbar">
            <h1 className="logo">BQ</h1>

            <label className="label_hamburguesa" For="menu_hamburguesa">
                <svg xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                fill="currentColor" 
                className="list_icon" 
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>
            </label>
            <input className="menu_hamburguesa" type="checkbox" id="menu_hamburguesa" />

            <ul className="ul_links">
                <li className="li_link"><a className="link" href="#game-section">Juego</a></li>
                <li className="li_link"><a className="link" href="#reglas">Reglas</a></li>
                <li className="li_link"><a className="link" href="#footer">Contacto</a></li>
            </ul>
        </nav>
      
    </header>
  )
}