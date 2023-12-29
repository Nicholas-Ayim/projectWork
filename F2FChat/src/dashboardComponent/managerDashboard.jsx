import "./managerDashboard.css";
import {
  selectAllContacts,
  newFilledForm,
  filledForm,
} from "../features/chatSlice";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { ContextApp } from "../contextComponent/context";
import HostelManagerForm from "../hostelManagerForm/hostelManagerForm";
import { useManagerRequestMutation } from "../services/chatApi";
export default function ManagerDashboard() {
  const { socket } = useContext(ContextApp);
  const managerSelected = useSelector(selectAllContacts);
  const [managerRequest, { data, isLoading, isError }] =
    useManagerRequestMutation();

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
  }, [socket, data, requestMessages]);

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
        console.log("the hostel found", hostel.to);
        // const { messengerPic, to, content, timeSent } = await hostel;
        // console.log("pic:", messengerPic, "to : ", to, "content", content);
        requestRow.push(hostel);
        setNewRequest(requestRow);
      }
    }
  }
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
                {formExist ? "" : "Edit Form"}
              </small>
            </div>

            <div className="setting-details">
              <p>settings</p>
              <p>logout</p>
            </div>
          </div>
        </div>

        <div className="manager-form-container">
          <div>{formExist && <HostelManagerForm />}</div>
          <div>
            {newRequest.map((receiveRequest, index) => {
              let { messengerPic, messenger, to, content, timeSent } =
                receiveRequest;
              return (
                <div key={index} className="request-container">
                  <div className="request-message-container">
                    <div className="sender-info">
                    <img
                      className="request-image"
                      alt="no-image"
                      src={messengerPic}
                    />
                    <small className="messenger-name">{messenger}</small>
                    </div>

                    <div>
                    <small className="default-request-msg">{content}</small>
                    <small className="time-delivered">{timeSent}</small>
                    </div>

                    <div className="btn-container">
                      <button className="accept-request">ACCEPT</button>
                      <button className="decline-request">DECLINE</button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
