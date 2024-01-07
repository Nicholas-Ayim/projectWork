import "./studentDashboard.css";
import PopularHostel from "../popularHostelsComponent/popularHostel";
import { selectAllContacts } from "../features/chatSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useManagerProfileMutation } from "../services/chatApi";
import RequestLoading from "./loadingRequest/requestLoading";
import Chat from "../chatComponent/chat";
export default function StudentDashboard() {
  const studentDetails = useSelector(selectAllContacts);
  const [managerInfo, { data, isLoading, isError, error }] =
    useManagerProfileMutation();
  const [searchWord, setSearchWord] = useState("");
  const [hostelFound, setHostelFound] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [viewChat, setViewChat] = useState(false);

  function handleChat(e) {
    e.preventDefault();
    console.log("to chat dashboard");
    setViewChat(!viewChat);
  }

  useEffect(() => {
    managerInfo();
  }, [managerInfo]);

  useEffect(() => {
    // console.log("search word", searchWord);
    // console.log("data data", data);
    if (data) {
      incomingData(data);
    }
  }, [searchWord, data]);

  function incomingData(data) {
    const hostelSearchDetails = data.map((manager) => ({
      id: manager._id,
      hostelManaged: manager.hostelManaged,
      hostelDetails: manager.hostelDetails,
      contact: manager.contact
    }));
    setHostelFound(hostelSearchDetails);
  }
  async function recomemndList(e) {
    e.preventDefault();
    setSearchWord(e.target.value);
  }
  async function handleSearch() {}
  return (
    <>
      <div>
        {viewChat && <Chat setViewChat={setViewChat} viewChat={viewChat} />}
      </div>
      <div className="student-dashboard-container">
        {!viewChat && (
          <div className="student-left-sidebar">
            <img
              src={studentDetails.picture}
              alt="no-image"
              className="student-image"
            />
            <h5 className="student-name">{studentDetails.name}</h5>
            <h5 className="student-index">{studentDetails.index}</h5>
            <h5 className="student-email">{studentDetails.email}</h5>
            <h5 className="student-status">{studentDetails.status}</h5>
            <p onClick={(e) => handleChat(e)} className="to-chat">
              chat
            </p>
          </div>
        )}
        <div className="student-right-sidebar">
          {!viewChat && (
            <div className="search-bar-container">
              <input
                type="search"
                value={searchWord}
                className="search-bar"
                placeholder="Search For Hostel Name ... eg: Aseda"
                onChange={(e) => recomemndList(e)}
              />
              <FaSearch
                className="search-icon"
                onClick={(e) => handleSearch(e)}
              />
            </div>
          )}
          {!viewChat && (
            <PopularHostel
              searchWord={searchWord}
              hostelFound={hostelFound}
              searchFunction={() => handleSearch()}
              setRequestSent={setRequestSent}
              viewChat={viewChat}
              setViewChat={setViewChat}
            />
          )}
        </div>
        <div>{requestSent && <RequestLoading />}</div>
      </div>
    </>
  );
}
