import CallAction from './components/callActions';
import Foot from './components/footer';
import Game from './components/game';
import NavBar from './components/navbar';
import Reglas from './components/reglas';
import './styles/App.css';

function App() {
  return (
    <div className="App">

      <NavBar />
      <CallAction />
      <Game />
      <Reglas />
      <Foot />
      <NavBar />

    </div>
  );
}

export default App;
