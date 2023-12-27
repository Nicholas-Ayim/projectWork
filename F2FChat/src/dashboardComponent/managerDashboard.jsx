import "./managerDashboard.css";
import {
  selectAllContacts,
  newFilledForm,
  filledForm,
} from "../features/chatSlice";
import { useSelector} from "react-redux";
import { useContext ,useEffect} from "react";
import { ContextApp } from "../contextComponent/context";
import HostelManagerForm from "../hostelManagerForm/hostelManagerForm";
export default function ManagerDashboard() {
  const { socket } = useContext(ContextApp);
  const managerSelected = useSelector(selectAllContacts)

    useEffect(() => {
      
    }, [socket]);

  

  const newForm = useSelector(newFilledForm);
  let checkForm;
  if (newForm && Object.keys(newForm)[0] === "hostelName") {
    console.log("new manager form found");
    checkForm = " ";
  } else {
    console.log("manager form not found yet");
    checkForm = "";
  }

  let formExist;
  const oldFormExist = useSelector(filledForm);
  if (oldFormExist && Object.keys(oldFormExist)[0] === "hostelName") {
    console.log("new manager form found");
    formExist = "";
  } else {
    console.log("manager form not found yet");
    formExist = " ";
  }

  const handleEditForm = (e) => {
    e.preventDefault();
    console.log("update existing forms");
  };
  return (
    <>
      <div className="dashboard-title">
        <h4>
          {managerSelected.hostelManaged.toUpperCase()} HOSTEL MANAGER'S
          DASHBOARD
        </h4>
      </div>
      <div className="dashboard-container">
        <div className="manager-sidebar">
          <div className="manager-sidebar-nest">
            <div className="personal-details">
              <img
                src={managerSelected?.picture}
                className="manager-pic"
                alt="no-image"
              />
              <p className="hostelManaged-name">
                <small>hostel: </small>
                {managerSelected.hostelManaged.substr(0, 10)}
              </p>
              <p className="hostelManaged-name">
                <small>call: </small>
                {managerSelected.contact.substr(0, 10)}
              </p>
              <p className="manager-online">{managerSelected.status}</p>
              <small>notification</small>
              {checkForm && <small onClick={handleEditForm}>Edit Form</small>}
              <small onClick={handleEditForm}>
                {formExist ? "" : "Edit Form" }
              </small>
            </div>

            <div className="setting-details">
              <p>settings</p>
              <p>logout</p>
            </div>
          </div>
        </div>

        <div className="manager-form-container">
          {formExist && <HostelManagerForm />}
        </div>
      </div>
    </>
  );
}
