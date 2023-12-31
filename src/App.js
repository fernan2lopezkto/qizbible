// import logo from './logo.svg';
import pnge from './assets/pngegg.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className='titulo'>
        <h1>Preguntas Biblicas</h1>
      </div>

        <img src={pnge} className="App-logo" alt="logo" />
        <p>
          proximamente
        </p>
        <a
          className="App-link"
          href="https://www.linkedin.com/in/juan-rey-fernan2lopezkto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Juan Rey
        </a>
      </header>
    </div>
  );
}

export default App;
