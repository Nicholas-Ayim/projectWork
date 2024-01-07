import "./requestMessage.css";
import { useContext } from "react";
import { ContextApp } from "../../contextComponent/context";
export default function RequestMessages({ newRequest }) {
  const context = useContext(ContextApp);
  const { socket } = context;
  function handleAccept(e, messengerDetails) {
    e.preventDefault();
    console.log("accept request", messengerDetails);
    socket.emit("accept-request", messengerDetails);
  }
  return (
    <div>
      {newRequest.map((receiveRequest, index) => {
        let { _id, messengerPic, dateSent, messenger, to, content, timeSent } =
          receiveRequest;

        let shortenedId = _id.substring(0, 5);
        return (
          <div key={index} className="request-container">
            <small className="message-id">#{shortenedId}</small>
            <h6 className="messenger-name">{messenger}</h6>
            <h7
              className={`${
                index % 2 === 0
                  ? "receive-status1"
                  : index % 2 === 1
                  ? "receive-status2"
                  : "receive-status3"
              }`}
            >
              New
            </h7>
            <img
              src={messengerPic}
              alt="no-image"
              className="messenger-picture"
            />
            <h6 className="request-message">{content}</h6>
            <small className="request-time">date: {dateSent}</small>
            <small className="request-time">time: {timeSent}</small>
            <div className="request-buttons">
              <button
                className="accept-btn"
                onClick={(e) => handleAccept(e, receiveRequest)}
              >
                Accept
              </button>
              <button className="decline-btn">Decline</button>
            </div>
            <button className="view-message">View</button>
          </div>
        );
      })}
    </div>
  );
}
