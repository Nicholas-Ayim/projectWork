import "./popularHostels.css";
import DefaultHostelSearch from "../defSearchComponent/defHostelSearch";
import { useEffect } from "react";
import Search from "../searchComponent/search";
import { useContext } from "react";
import { ContextApp } from "../contextComponent/context";
export default function PopularHostel({
  searchWord,
  hostelFound,
  searchFunction,
}) {
  // const {socket} = useContext(ContextApp)

  

  return (
    <>
      <div className="popular-hostel-title">
        <h3>popular hostels</h3>
      </div>
      {searchWord !== "" ? (
        <Search
          searchWord={searchWord}
          hostelFound={hostelFound}
          searchFunction={() => searchFunction()}
        />
      ) : (
        <DefaultHostelSearch />
      )}
    </>
  );
}
