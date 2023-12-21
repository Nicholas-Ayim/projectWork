import "./aboutus.css"
export default function AboutUs() {
  const aboutUs = [
    "Streamlined Communication: NayyChat provides a simplified platform for effective communication within hostels, ensuring residents can easily connect with each other.",
    "Hostel-wide Announcements: The app allows for the broadcast of important announcements, keeping all residents informed about events, maintenance schedules, or any other relevant updates.",
    "Private Messaging: Users can engage in private conversations, facilitating one-on-one communication for personal discussions or coordination between residents.",
    "Event Planning: NayyChat includes features for planning and coordinating events within the hostel, enabling residents to organize social gatherings, study sessions, or other activities",
    "Roommate Matching: The app offers a convenient way for residents to find and connect with potential roommates based on shared interests, schedules, or preferences.",
    "Feedback and Suggestions: NayyChat provides a platform for residents to share feedback and suggestions, fostering a sense of community involvement and continuous improvement within the hostel environment.",
    "Emergency Alerts: In case of emergencies, NayyChat can be utilized to quickly disseminate important information and updates, ensuring a prompt and coordinated response from the hostel community.",
  ];
  return (
    <>
      <div>
        {aboutUs.map((about, index) => (
          <ul className="about-container" key={index}>
            <small className="about-statement">{index+1} {about}</small>
          </ul>
        ))}
      </div>
    </>
  );
}
