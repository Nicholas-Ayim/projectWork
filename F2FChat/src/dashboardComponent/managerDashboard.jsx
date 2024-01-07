import "./managerDashboard.css";
import {
  selectAllContacts,
  newFilledForm,
  filledForm
} from "../features/chatSlice";
import { useSelector } from "react-redux";
import { useContext, useEffect, useRef, useState } from "react";
import { ContextApp } from "../contextComponent/context";
import HostelManagerForm from "../hostelManagerForm/hostelManagerForm";
import { useManagerRequestMutation } from "../services/chatApi";
import Notification from "./notificationDashboard/notification";
import ManagerSideBar from "./managerSideBar/managerSideBar";
import { selectNewRequest } from "../features/chatSlice";
export default function ManagerDashboard() {
  const { socket } = useContext(ContextApp);
  const managerSelected = useSelector(selectAllContacts);
  const [managerRequest, { data, isLoading, isError }] =
    useManagerRequestMutation();

  const newRequestReceived = useSelector(selectNewRequest);

  const [newRequest, setNewRequest] = useState([]);
  useEffect(() => {
    managerRequest();
  }, [managerRequest]);
  useEffect(() => {
    socket.on("join-request", (data) => {
      // console.log("someone want to join");
    });

    if (data) {
      requestMessages(data);
    }
  }, [socket, data]);

  const newForm = useSelector(newFilledForm);
  let checkForm;
  if (newForm && Object.keys(newForm)[0] === "hostelName") {
    // console.log("new manager form found");
    checkForm = " ";
  } else {
    // console.log("manager form not found yet");
    checkForm = "";
  }

  let formExist;
  const oldFormExist = useSelector(filledForm);
  if (oldFormExist && Object.keys(oldFormExist)[0] === "hostelName") {
    // console.log("new manager form found");
    formExist = "";
  } else {
    // console.log("manager form not found yet");
    formExist = " ";
  }

  const handleEditForm = (e) => {
    e.preventDefault();
    // console.log("update existing forms");
  };

  async function requestMessages(hostelArray) {
    const requestRow = [];
    for (const hostel of hostelArray) {
      const { hostelManaged } = managerSelected;
      if (hostel.to === hostelManaged) {
        // console.log("the hostel found", hostel.to);
        requestRow.push(hostel);
        setNewRequest(requestRow);
      }
    }
  }
  const [onShow, setOnShow] = useState(false);
  return (
    <>
      <div className="dashboard-title">
        <h4>
          {managerSelected?.hostelManaged.toUpperCase()} HOSTEL MANAGER'S
          DASHBOARD
        </h4>
      </div>
      <div className="dashboard-container">
        <ManagerSideBar
          managerSelected={managerSelected}
          checkForm={checkForm}
          formExist={formExist}
          handleEditForm={() => handleEditForm()}
          onShow={onShow}
          setOnShow={setOnShow}
        />
        <div className="manager-form-container">
          <div>{formExist && <HostelManagerForm />}</div>
          {onShow && (
            <Notification
              setNewRequest={setNewRequest}
              newRequest={newRequest || newRequestReceived}
            />
          )}
        </div>
      </div>
    </>
  );
}
