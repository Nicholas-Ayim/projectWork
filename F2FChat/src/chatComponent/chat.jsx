import "./chat.css";
import ChatMessages from "./chatMessages";
import {
  FiSearch,
  FiBell,
  FiPhone,
  FiMessageCircle,
  FiUser,
  FiSettings,
  FiPhoneMissed,
  FiArrowLeft
} from "react-icons/fi";
export default function Chat({ setViewChat, viewChat }) {
  function handleExit(e) {
    e.preventDefault();
    console.log("back to page");
    setViewChat(!viewChat);
  }
  return (
    <>
      <div className="main-body">
        <div>
          <h6>LET CHAT</h6>
        </div>
        <div className="chat-main-container">
          <div className="chat-left-sidebar">
            <div className="chat-menu"></div>
            <div className="chat-router">
              <div className="chat-profile-nav">
                <img src="" alt="no" className="chat-image" />
                <small>
                  <FiMessageCircle />
                </small>
                <small>
                  <FiPhoneMissed />
                </small>
                <small>
                  <FiUser />
                </small>
                <small>
                  <FiSettings />
                </small>
                <div className="exit-chat">
                  <small onClick={(e) => handleExit(e)}>
                    <FiArrowLeft />
                  </small>
                  <small onClick={(e) => handleExit(e)}>exit</small>
                </div>
              </div>
            </div>
          </div>
          <div className="online-sidebar">
            <div className="chat-app-name">
              <small>
                <FiMessageCircle /> letChat
              </small>
              <img src="" alt="no" className="chat-image" />
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="search for friends"
                className="chat-search"
              />
              <small>
                <FiSearch />
              </small>
            </div>

            <div className="chat-fields">
              <div className="chat-and-icon">
                <small>
                  <FiMessageCircle />
                </small>
                <small>chat</small>
              </div>
              <div className="contacts-and-icon">
                <small>
                  <FiPhone />
                </small>
                <small>contacts</small>
              </div>
              <div className="groups-and-icon">
                <small>
                  <FiUser />
                </small>
                <small>groups</small>
              </div>
              <div className="notification-and-icon">
                <small>
                  <FiBell />
                </small>
                <small>not</small>
              </div>
            </div>

            <div className="chat-members-online"></div>
          </div>
          <div className="main-chat-sidebar">
            <ChatMessages />
          </div>
        </div>
      </div>
    </>
  );
}
