import pnge from '../assets/pngegg.png'
import "../styles/callAction.css"


export default function CallAction() {
  return(
    <>
    <div className='call-container'>
      <div className='text-container'>
        <h1>Preguntas Bíblicas</h1>
        <p>App de preguntas y respuestas bíblicas</p>
        <button className='call-button'>Jugar</button>
      </div>
      <div className='container-logo'>
      <img src={pnge} className="App-logo" alt="logo" />
      <div className='call-action-circle'></div>
      </div>
    </div>
    </>
  )
}