import { useEffect, useState } from "react";
import { useManagerProfileMutation } from "../services/chatApi";
import { ContextApp } from "../contextComponent/context";
import { useContext } from "react";


export default function Search({ searchWord }) {
  const [managerInfo, { data, isLoading, isError }] = useManagerProfileMutation();
  const [hostel, setHostel] = useState([]);
  const { socket } = useContext(ContextApp);

  useEffect(() => {
    managerInfo();
  }, [managerInfo]);

  useEffect(() => {
    if (data) {
      incoming(data);
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

  async function handleJoin(e, hostelInfo) {
    e.preventDefault();
    try {
      console.log(hostelInfo);
      await socket.emit('new-request', hostelInfo);
    } catch (error) {
      console.log('error in emitting data', error);
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
                {Object.values(data.hostelDetails)[3].map((image, index) => (
                  index === 0 && (
                    <img
                      key={index}
                      src={image}
                      alt="no-image"
                      className="popular-hostel-images"
                    />
                  )
                ))}
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
                    onClick={(e) => handleJoin(e, data)}
                  >
                    join
                  </button>
                )}
              </div>
            </div>
          );
        }
        return null
      })}
    </div>
  );
}
