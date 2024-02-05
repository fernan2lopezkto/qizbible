import pnge from '../assets/pngegg1.png'
import "../styles/callAction.css"


export default function CallAction() {
  return (
    <>
      <div className='call-container'>

        <div className='container-logo'>
          <h1 className='text-container'>Preguntas Bíblicas</h1>
          <img src={pnge} className="App-logo" alt="logo" />
          <div className='call-action-circle'></div>
        </div>
      </div>
    </>
  )
}

<div >

<p>App de preguntas y respuestas bíblicas</p>
<a href="#game-section" className='call-button'>JUGAR</a>
</div>