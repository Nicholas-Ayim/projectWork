import "./homePage.css";
import Home from "../headerComponent/home";
import Places from "../placesComponent/places";
import Hostel from "../hostelComponent/hostel";
import AboutUs from "../AboutComponent/aboutus";
import serviceLogo from "../../public/images/serviceLogo/serviceLogo.avif";
import { GrChat } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const services = [
    `Introducing NayyChat, the exclusive communication platform for University of Cape Coast hostels. Facilitating seamless interaction, NayyChat enables residents to connect and communicate without prior acquaintance. Through a simple registration process, users gain access to a private network fostering camaraderie and support. More than just a chat app, NayyChat aims to strengthen the sense of community within the university hostels, transcending physical boundaries and enriching the overall student experience. Join NayyChat today and embark on a journey of meaningful connections at the University of Cape Coast.`,
  ];
  const navigate = useNavigate()
  const signupUser = (e) => {
    e.preventDefault();
    navigate("/signup")
  };
  console.log();
  return (
    <>
      <Home />

      <div className="locations-container">
        <Places />
        <Hostel />
      </div>

      <div className="service-container">
        <h5 className="service-header">SERVICES</h5>
        <small className="service-message">{services}</small>
      </div>

      <div className="service-image-container">
        <div>
          <img src={serviceLogo} alt="no-image" className="service-image" />
        </div>
        <button className="get-started" onClick={signupUser}>
          GET STARTED  <GrChat className="chat-icon"/>
        </button>
      </div>

      <div className="about-us">
        <h6 className="sub-header-aboutUs">About us</h6>
        <AboutUs />
      </div>
    </>
  );
}
