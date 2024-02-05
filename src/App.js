import CallAction from './components/callActions';
import Foot from './components/footer';
import Game from './components/game';
import NavBar from './components/navbar';
import Reglas from './components/reglas';
import Hnavbar from './components/hnavbar';

import './styles/App.css';

function App() {
  return (
    <div className="App">

      <Hnavbar />
      <CallAction />
      <Game />
      <Reglas />
      <Foot />
      <NavBar />

    </div>
  );
}

export default App;
