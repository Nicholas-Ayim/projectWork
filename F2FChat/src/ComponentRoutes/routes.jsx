import HomePage from "../homeComponent/homePage";
import Signup from "../signupComponent/signup";
import LoginStudent from "../loginComponent/studentComponent/loginStudent";
import LoginManager from "../loginComponent/managerComponent/loginManager";
import ManagerPage from "../signupComponent/ManagerComponent/managerSignup";
import StudentPage from "../signupComponent/StudentComponent/studentSignUp";
import ManagerDashboard from "../dashboardComponent/managerDashboard";
import StudentDashboard from "../dashboardComponent/studentDashboard";
import { Routes, Route } from "react-router-dom";
import "./routes.css";
export default function AllRoutes() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login/student" element={<LoginStudent />} />
          <Route exact path="/login/manager" element={<LoginManager />} />
          <Route exact path="/signup/manager" element={<ManagerPage />} />
          <Route exact path="/signup/student" element={<StudentPage />} />
          <Route exact path="/student/dashboard" element={<StudentDashboard />} />
          <Route exact path="/manager/dashboard" element={<ManagerDashboard />} />
        </Routes>
      </div>
    </>
  );
}
