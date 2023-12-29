import { useEffect } from "react";
import { filledForm } from "../../features/chatSlice";
import Notification from "../notificationDashboard/notification";
export default function ManagerSideBar({
  managerSelected,
  checkForm,
  handleEditForm,
  formExist,
  onShow,
  setOnShow,
}) {
  const showNotification = (e) => {
    e.preventDefault();
    console.log("show notifications");
    setOnShow(!onShow);
  };

  return (
    <>
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
            <small onClick={(e) => showNotification(e)}>notification</small>
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
    </>
  );
}
