import logo from "../assets/rzbLogo.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
            <img className="mx-2 w-10" src={logo} alt="" />
        </div>
        <div className="flex m-8 items-center justify-center gap-4 text-2xl">
          <a href="https://www.linkedin.com/in/ronald-zuni-bachtiar-a52990345/" target="_blank">
            <FaLinkedin />
          </a>
          <a href="https://github.com/clizardyy" target="_blank">
            <FaGithub />          
          </a>
          <a href="https://www.instagram.com/ronald_rzb/" target="_blank">
            <FaInstagram />          
          </a>
          <a href="https://www.facebook.com/ronald.bachtiar.73" target="_blank">
            <FaFacebook />          
          </a>
        </div>
    </nav>
  );
};

export default Navbar;