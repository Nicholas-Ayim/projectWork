import { Link } from "react-router-dom";
import "./links.css";
import uccLogo from "../../public/images/uccLogo.png";

export default function Links() {
  return (
    <>
      <div className="links">
        <small>
          <Link to="/">
            <img src={uccLogo} className="ucc-image" alt="no-image" />
          </Link>
        </small>
        <div className="signup-login">
          <small>
            <Link to="/signup">signup</Link>
          </small>
          <small>
            <Link to="/login/student">login</Link>
          </small>
        </div>
      </div>
    </>
  );
}
