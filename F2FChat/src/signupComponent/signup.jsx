import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import uccGate from "../../public/images/uccGate.jpg";
export default function Signup() {
  const navigate = useNavigate();
  const managerPage = (e) => {
    e.preventDefault();
    // console.log('hello')
    return navigate("/signup/manager");
  };
  const studentPage = (e) => {
    e.preventDefault();
    return navigate("/signup/student");
  };

  return (
    <>
    <div className="signup-background">
      <div className="signup-uccHostelConnect">
        <h3>UCC HOSTEL CONNECT</h3>
      </div>
      <div className="ucc-gate-container">
        <img src={uccGate} alt="no-image" className="ucc-gate-image" />
      </div>

      <div className="teaser">
        <div className="user-teaser">
          <p className="signup-text">Hostel Manager can communicate|| </p>
          <p className="signup-text">Student can communicate||</p>
          <p className="signup-text"> Memebers can communicate</p>
        </div>
        <h3 className="signup-text">
          Register and chat your friend in your hostel: the one you know and one
          you do not know
        </h3>
      </div>

      <div className="users">
        <p className="signup-as">Signup as:</p>
        <select>
          <option></option>
          <option onClick={managerPage}>Manager</option>
          <option onClick={studentPage}>Student</option>
        </select>
      </div>

      <div className="users">
       <p>have an account?</p>
       <small><Link to="/login/student">Login</Link></small>
      </div>
      </div>
    </>
  );
}
