import RequestMessages from "./requestMessages";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import "./notification.css";
export default function Notification({ newRequest, setNewRequest }) {
  return (
    <>
      <div>
        <small>Dashboard/Requests</small>
      </div>
      <div className="sub-heading-container">
        <div className="request-options">
          <h6 className="request-header">
            Request
            <IoMdArrowDropdown className="fa-icons" />
          </h6>
          <h6 className="request-display">
            Display All <IoMdArrowDropdown className="fa-icons" />
          </h6>
          <h6 className="request-total">2 Total</h6>
        </div>
        <div className="find-request">
          <input
            type="text"
            placeholder="find a request"
            className="find-student-input"
          />
          <BsSearch className="request-search-icon" />
        </div>
      </div>
      <div>
        <RequestMessages setNewRequest={setNewRequest}  newRequest={newRequest} />
      </div>
    </>
  );
}
