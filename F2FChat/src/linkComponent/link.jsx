import { Link, useNavigate } from "react-router-dom";
import "./links.css";
import uccLogo from "../../public/images/uccLogo.png";
import { selectAllContacts } from "../features/chatSlice";
import { useLogoutMutation } from "../services/chatApi";
import { useSelector } from "react-redux";
export default function Links() {
  const activeUser = useSelector(selectAllContacts);
  const showLogout = useSelector(selectAllContacts);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await logout({ id: activeUser._id });
      navigate("/login/student");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <>
      <div className="links">
        {showLogout && (
          <div className="welcome-user">
            <Link>
              <img src={uccLogo} className="ucc-image" alt="no-image" />
            </Link>
          </div>
        )}
        {!showLogout && (
          <small>
            <Link to="/">
              <img src={uccLogo} className="ucc-image" alt="no-image" />
            </Link>
          </small>
        )}
        <div className="signup-login">
          <small>
            <Link to="/signup">signup</Link>
          </small>
          {!showLogout && (
            <small>
              <Link to="/login/student">login</Link>
            </small>
          )}

          {showLogout && (
            <small>
              <Link onClick={(e) => handleLogout(e)}>logout</Link>
            </small>
          )}
        </div>
      </div>
    </>
  );
}
