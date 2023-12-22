import "./popularHostels.css";
import DefaultHostelSearch from "../defSearchComponent/defHostelSearch";
import { useEffect } from "react";
export default function PopularHostel({
  foundWord,
  searchWord,
  hostelFound,
  searchFunction,
}) {
  useEffect(() => {
    console.log("state changes");
  }, [searchWord, foundWord]);
  return (
    <>
      <div className="popular-hostel-title">
        <h3>popular hostels</h3>
      </div>
      {searchWord !== "" ? (
        <div>
          {hostelFound.map((data, index) => {
            const word = data.hostelManaged;
            if (searchWord === word.substr(0, 7)) {
              return (
                <div key={index || data.id}>
                  <div>
                    {Object.values(data.hostelDetails)[3].map(
                      (hostelPic, index) => {
                        if (index === 0) {
                          return (
                            <div
                              key={index}
                              className="popular-hostel-container"
                            >
                              <div className="image-container">
                                <img
                                  src={hostelPic}
                                  alt="no-image"
                                  className="search-image"
                                />
                              </div>
                              <div className="hostel-details-join">
                                <p className="hostel-managed-name">
                                  {data.hostelManaged}
                                </p>
                                <button
                                  className="joined-chat"
                                >
                                  join+
                                </button>
                              </div>
                            </div>
                          );
                        }
                      }
                    )}
                  </div>
                </div>
              );
            }
            searchFunction();
          })}
        </div>
      ) : (
        // <div>
        //   <h4>no page available</h4>
        //   <h3>The word found {foundWord}</h3>
        // </div>
        <DefaultHostelSearch />
      )}
    </>
  );
}
