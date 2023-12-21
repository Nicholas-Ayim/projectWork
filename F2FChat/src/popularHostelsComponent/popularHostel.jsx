import { useManagerProfileMutation } from "../services/chatApi";
import { useEffect, useState } from "react";
import "./popularHostels.css";

export default function PopularHostel() {
  const [managerProfile, { data, isError, error }] =
    useManagerProfileMutation();

  useEffect(() => {
    managerProfile();
  }, [managerProfile]);

  useEffect(() => {
    if (data) {
      console.log("Manager data:", data.length);
      awaitData(data);
    }

    if (isError) {
      console.error("Error fetching manager data:", error);
    }
  }, [data, isError, error]);

  const [hostels, setHostels] = useState([]);
  const [isScaledArray, setIsScaledArray] = useState([]);

  function awaitData(data) {
    console.log("the data is in", data);

    const uniqueHostels = data.map((item) => ({
      id: item._id,
      hostelManaged: item.hostelManaged,
      name: item.name,
      hostelDetails: item.hostelDetails,
    }));

    setHostels(uniqueHostels);
    // Initialize the isScaledArray with false for each hostel
    // setIsScaledArray(Array(uniqueHostels.length).fill(false));
  }

  function joinHostel(e) {
    e.preventDefault();
    console.log("student wants to join");
  }

  function handleScaled(index) {
    // Update the scaled state for the clicked hostel
    setIsScaledArray((prev) => {
      const newArray = [...prev];
      console.log("copy", newArray);
      newArray[index] = !newArray[index];
      return newArray;
    });
  }

  return (
    <>
    <div className="popular-hostel-title">
      <h3 >popular hosels</h3>
      </div>
      <div>
        {hostels.map((hostel, index) => {
          if (index <= 4) {
            const isScaled = isScaledArray[index];

            return (
              <div key={hostel.id} className="popular-hostel-container">
                <div className="images-container">
                  {Object.values(hostel.hostelDetails)[3].map(
                    (data, dataIndex) => {
                      if (dataIndex === 0) {
                        const imageShown = {
                          transform: isScaled ? "scale(2)" : "scale(1.0)",
                        };
                        return (
                          <div key={dataIndex} className="image-container">
                            <img
                              src={data}
                              alt="no-image"
                              className="popular-hostel-images"
                              style={imageShown}
                              onClick={() => handleScaled(index)}
                            />
                          </div>
                        );
                      }
                      return null;
                    }
                  )}
                </div>
                <div className="hostel-details-join">
                  <p className="hostel-managed-name">{hostel.hostelManaged}</p>
                  <button className="joined-chat" onClick={joinHostel}>
                    join
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
