// import logo from './logo.svg';
import './App.css';
import Hnavbar from './components/hnavbar';
import CallAction from './components/callActions';
import Foot from './components/footer';
import Game from './components/game';
import NavBar from './components/navbar';
import Reglas from './components/reglas';

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