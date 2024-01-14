import "../styles/footer.css"
import link from "../assets/images/linkedin.png"
import git from "../assets/images/github.png"
import insta from "../assets/images/instagram.png"
import web from "../assets/images/web.png"

export default function Foot() {
  return (
      <div className="footer-container">
        <div>
          <p className="footer-mail">fernan2lopezkto@gmail.com</p>
          <p className="footer-description">app hecha para aplicar conocimientos de programacion y desarroyo web, espero que te haya gustado</p>
          <div>
            <a href="https://www.linkedin.com/in/juan-rey-fernan2lopezkto/" ><img className="footer-social-icon" src={link} alt="Linkedin" /></a>
            <a href="https://github.com/fernan2lopezkto/qizbible" ><img className="footer-social-icon" src={git} alt="Github" /></a>
            <a href="https://www.instagram.com/fernan2lopezkto/" ><img className="footer-social-icon" src={insta} alt="Instagram" /></a>
            <a href="https://linktr.ee/fernan2lopezkto" ><img className="footer-social-icon" src={web} alt="Mi Web" /></a>
          </div>
        </div>
    </div>
  )
}