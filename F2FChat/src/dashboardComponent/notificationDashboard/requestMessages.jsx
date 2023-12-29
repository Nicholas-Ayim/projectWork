import "./requestMessage.css";
export default function RequestMessages({ newRequest }) {
  return (
    <div>
      {newRequest.map((receiveRequest, index) => {
        let { _id, messengerPic, messenger, to, content, timeSent } =
          receiveRequest;
        return (
          <div key={index} className="request-container">
            <small className="message-id">#{_id}</small>
            <h6 className="messenger-name">{messenger}</h6>
            <h7
             className={`${
                index % 2 === 0 ? "receive-status1" : index % 2 === 1 ? "receive-status2" : "receive-status3"
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
            <small className="request-time">{timeSent}</small>
            <div className="request-buttons">
              <button className="accept-btn">Accept</button>
              <button className="decline-btn">Decline</button>
            </div>
            <button className="view-message">View</button>
          </div>
        );
      })}
    </div>
  );
}
