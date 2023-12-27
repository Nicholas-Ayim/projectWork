import { useNavigate } from "react-router-dom";
import "./loginManager.css";
import { useState } from "react";
import { useLoginManagerMutation } from "../../services/chatApi";
export default function LoginManager() {
  const navigate = useNavigate();

  const [loginManager, { isLoading, error }] = useLoginManagerMutation();
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const toLoginStudent = (e) => {
    e.preventDefault();
    navigate("/login/student");
  };
  const onsubmit = (e) => {
    e.preventDefault();
    loginManager({contact,password}).then((data)=>{
      if(data){
        console.log("login manager...",data)
        navigate("/manager/dashboard")
      
      }
    })
  };
  return (
    <>
    <div>
    </div>
      <div className="main-container">
        <div className="login-manager-container">
          <h3>LOGINING AS HOSTEL MANAGER</h3>
          <form className="login-manager-form">
            <label>
              <h4>contact</h4>
              <input type="text" value={contact}  onChange={(e)=>setContact(e.target.value)}/>
            </label>

            <label>
              <h4>password</h4>
              <input value={password}  onChange={(e)=>setPassword(e.target.value)} type="password" />
            </label>
            <label>
              <button  type="submit" onClick={onsubmit}>
                LOGIN
              </button>
            </label>
          </form>
          <div className="user-options-manager">
            <h4>login as:</h4>
            <select>
              <option></option>
              <option onClick={toLoginStudent}>Student</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
