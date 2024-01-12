import { Link, useNavigate } from "react-router-dom";
import "./loginStudent.css";
import { useLoginStudentMutation } from "../../services/chatApi";
import { useEffect, useState } from "react";
export default function Login() {
  const navigate = useNavigate();

  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [Error, setError] = useState("");

  const [loginStudent, { isLoading, error }] = useLoginStudentMutation();
  useEffect(() => {
    if (error) {
      console.log("new error" + error);
    }
    if (isLoading) {
      console.log("loading");
    }
  }, [error, isLoading]);

  // const toLoginManager = (e) => {
  //   e.preventDefault();

  //   navigate("/login/manager");
  // };

  async function toStudentDashBoard(e) {
    e.preventDefault();
    try {
      await loginStudent({ contact, password })
        .then((result) => {
          if (!result.error) {
            console.log("login...", result.error);
            return navigate("/student/dashboard");
          } else {
            const error = result.error;
            setError(error.data);
            console.log("error found", result.error);
          }
        })
        .catch(() => console.log("the error"));
      //navigate to studentdashboard
    } catch (error) {
      console.log("error occurred");
    }
  }

  return (
    <>
      <body className="login-page">
        <div className="login-container">
          <h4 className="login">LOGINING STUDENT...</h4>
          <p className="error-alert">{Error}</p>
          <form>
            <label>
              <small>contact</small>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="0249999999"
              />
            </label>
            <label>
              <small>password</small>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </label>

            <label>
              <button
                className="login-btn"
                type="submit"
                onClick={toStudentDashBoard}
              >
                LOGIN
              </button>
            </label>
          </form>
          <div className="user-login-options">
            <h5>login as:</h5>
            {/* <select>
              <option></option>
              <option onClick={(e) => toLoginManager(e)}>Manager</option>
            </select> */}
            <Link to="/login/manager">Manager</Link>
          </div>
        </div>
      </body>
    </>
  );
}
