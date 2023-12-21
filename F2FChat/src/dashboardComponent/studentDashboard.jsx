import "./studentDashboard.css"
import PopularHostel from "../popularHostelsComponent/popularHostel"
import { selectAllContacts } from "../features/chatSlice"
import { useSelector } from "react-redux"
export default function StudentDashboard() {
  const studentDetails = useSelector(selectAllContacts)

  return(
    <>
    <div className="student-dashboard-container">
    <div className="student-left-sidebar">
      <img src={studentDetails.picture} alt="no-image" className="student-image"/>
      <h5 className="student-name">{studentDetails.name}</h5>
      <h5 className="student-index">{studentDetails.index}</h5>
      <h5 className="student-email">{studentDetails.email}</h5>
    </div>
    <div className="student-right-sidebar">
      <input type="search" className="search-bar" placeholder="Search For Hostel Name ... eg: Aseda"/>
      <PopularHostel/>
    </div>
    </div>
    </>
  )
}
