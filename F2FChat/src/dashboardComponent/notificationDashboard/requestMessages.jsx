export default function RequestMessages({ newRequest }) {
  return (
    <div>
      {newRequest.map((receiveRequest, index) => {
        let { messengerPic, messenger, to, content, timeSent } = receiveRequest;
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
  );
}
