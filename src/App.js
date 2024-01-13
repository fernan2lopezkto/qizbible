import CallAction from './components/callActions';
import Foot from './components/footer';
import Game from './components/game';
import Reglas from './components/reglas';
import './styles/App.css';

function App() {
  return (
    <div className="App">

      <CallAction />
      <Game />
      <Reglas />
      <Foot />

    </div>
  );
}

export default App;
