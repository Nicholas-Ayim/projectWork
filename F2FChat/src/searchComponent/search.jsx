import { useEffect, useState } from "react";
import { useManagerProfileMutation } from "../services/chatApi";
import { ContextApp } from "../contextComponent/context";
import { useContext } from "react";
import { selectAllContacts } from "../features/chatSlice";
import { useSelector } from "react-redux";
export default function Search({ searchWord }) {
  const [managerInfo, { data, isLoading, isError }] =
    useManagerProfileMutation();
  const [hostel, setHostel] = useState([]);
  const [allHostels, setAllHostels] = useState([]);
  const currentStudent = useSelector(selectAllContacts);
  const { socket } = useContext(ContextApp);

  useEffect(() => {
    managerInfo();
  }, [managerInfo]);

  useEffect(() => {
    if (data) {
      incoming(data);
      setAllHostels(data);
    }
  }, [data, searchWord]);

  function incoming(data) {
    const managerDetails = data.map((item) => ({
      _id: item._id,
      hostelName: item.hostelManaged,
      hostelDetails: item.hostelDetails,
    }));
    setHostel(managerDetails);
  }
  async function handleJoin(e, hostelInfo, allData, currentStudent) {
    e.preventDefault();
    try {
      console.log(hostelInfo);
      await socket.emit("join-request", hostelInfo, allData, currentStudent);
    } catch (error) {
      console.log("error in emitting data", error);
    }
  }

  return (
    <div>
      {hostel.map((data) => {
        const word = data.hostelName;
        if (searchWord === word) {
          return (
            <div key={data._id} className="popular-hostel-container">
              <div className="images-container">
                {Object.values(data.hostelDetails)[3].map(
                  (image, index) =>
                    index === 0 && (
                      <img
                        key={index}
                        src={image}
                        alt="no-image"
                        className="popular-hostel-images"
                      />
                    )
                )}
              </div>
              <div className="hostel-details-join">
                <small className="hostel-managed-name">
                  {Object.values(data.hostelDetails)[0]
                    ? Object.values(data.hostelDetails)[0]
                    : "hostel name not found"}
                </small>

                {Object.values(data.hostelDetails)[0] && (
                  <button
                    className="joined-chat"
                    onClick={(e) =>
                      handleJoin(e, data, allHostels, currentStudent)
                    }
                  >
                    join
                  </button>
                )}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
