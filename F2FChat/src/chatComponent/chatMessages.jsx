import "./chatMessages.css";
import { FaCamera, FaVideo } from "react-icons/fa";
import { FiSend, FiVoicemail } from "react-icons/fi";
import { MdVoiceChat } from "react-icons/md";
export default function ChatMessages() {
  return (
    <>
      <div>
        <div className="chat-header">
          <img src="" alt="no-image" className="sender-image" />
          <div className="sender-status">
            <small className="sender-name">Nicholas</small>
            <small className="sender-typing">typing...</small>
          </div>
          <div className="video-audio-call">
            <small className="voice-icon">
              <FiVoicemail />
            </small>
            <small className="video-icon">
              <FaVideo />
            </small>
            <small>:</small>
          </div>
        </div>
        <div className="message-output"></div>
        <div className="send-messages">
          <input
            type="text"
            placeholder="send message"
            className="send-message-input"
          />
          <div className="gallery-audio">
            <small className="gallerys-icon">
              <FaCamera />
            </small>
            <small className="voices-icon">
              <FiVoicemail />
            </small>
            <small className="send-icon">
              <FiSend />
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
