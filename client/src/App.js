import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import "./App.css";
import Home from "./components/Home";
import StudentLogin from "./components/StudentLogin";
import StudentRegister from "./components/StudentRegister";
import StudentProfile from "./components/StudentProfile";
import StudentLogout from "./components/StudentLogout";
import CaptureImage from "./components/CaptureImage";
import CompareImage from "./components/CompareImage";
import FacultyLogin from "./components/FacultyLogin";
import FacultyProfile from "./components/FacultyProfile";
import FacultyRegister from "./components/FacultyRegister";
import FacultyLogout from "./components/FacultyLogout";
import GenerateCode from "./components/FacultyProfile/GenerateCode";
import ProfilePage from "./components/FacultyProfile/ProfilePage";
import DailyAttendance from "./components/FacultyProfile/DailyAttendance";
import MonthlyAttendance from "./components/FacultyProfile/MonthlyAttendance";
import StudentProfilePage from "./components/StudentProfile/StudentProfilePage";
import AuthenticateCode from "./components/StudentProfile/AuthenticateCode";
import WithNavbar from "./components/WithNavbar";
import WithoutNav from "./components/WithoutNav";
import FacultyChat from "./components/FacultyProfile/FacultyChat";
import StudentChat from "./components/StudentProfile/StudentChat";


function App() {
  return (
    <>
      <Routes>
        <Route element={<WithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/logout/student" element={<StudentLogout />} />
          <Route path="/captureImage" element={<CaptureImage />} />
          <Route path="/compareImage" element={<CompareImage />} />
          <Route path="/login/faculty" element={<FacultyLogin />} />
          <Route path="/register/faculty" element={<FacultyRegister />} />
          <Route path="/logout/faculty" element={<FacultyLogout />} />
        </Route>

        <Route element={<WithoutNav />}>
          <Route path="/profile/student" element={<StudentProfile />}>
            <Route path="" element={<StudentProfilePage />} />
            <Route path="authenticateCode" element={<AuthenticateCode />} />
            <Route path="chat" element={<StudentChat/>}/>
          </Route>

          <Route path="/profile/faculty" element={<FacultyProfile />}>
            <Route path="" element={<ProfilePage />} />
            <Route path="generateCode" element={<GenerateCode />} />
            <Route path="daily" element={<DailyAttendance />} />
            <Route path="monthly" element={<MonthlyAttendance />} />
            <Route path="chat" element={ <FacultyChat/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
