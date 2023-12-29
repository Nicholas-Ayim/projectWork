import "./requestMessage.css";
export default function RequestMessages({ newRequest }) {
  return (
    <div>
      {newRequest.map((receiveRequest, index) => {
        let { messengerPic, messenger, to, content, timeSent } = receiveRequest;
        return (
          <div key={index} className="request-container">
            
          </div>
        );
      })}
    </div>
  );
}
