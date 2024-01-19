import UserAuthContextProvider from "./context/UserAuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_Page from "./pages/Home_Page";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestedRoute from "./routes/GuestedRoute";
import Login_Page from "./pages/auth/Login_Page";
import Register_Page from "./pages/auth/Register_Page";
import Navbar from "./components/Navbar";
import MainContextProvider from "./context/MainContext";
import Admin_Add_Trusted_Company from "./pages/admin/Admin_Add_Trusted_Company";
import Admin_Add_Course from "./pages/admin/Admin_Add_Course";
import Admin_Page from "./pages/admin/Admin_Page";
import Admin_Course_Page from "./pages/admin/Admin_Course_Page";
import Admin_Add_Lesson from "./pages/admin/Admin_Add_Lesson";
import Courses_Page from "./pages/Courses_Page";
import Course_Page from "./pages/Course_Page";
import Admin_Add_Instructor from "./pages/admin/Admin_Add_Instructor";
import Reset_Password_Page from "./pages/auth/Reset_Password_Page";
import Instructor_Page from "./pages/Instructor_Page";
import Profile_Page from "./pages/Profile_Page";
import Admin_Students_Page from "./pages/admin/Admin_Students_Page";
import Contact_Page from "./pages/Contact_Page";

function App() {
  return (
    <UserAuthContextProvider>
      <MainContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              excat
              path="/"
              element={
                <ProtectedRoute>
                  <Home_Page />
                </ProtectedRoute>
              }
            />

            <Route excat path="/courses" element={<Courses_Page />} />

            <Route excat path="/course/:courseName" element={<Course_Page />} />

            <Route
              excat
              path="/instructor/:instructorName"
              element={<Instructor_Page />}
            />

            <Route excat path="/profile" element={<Profile_Page />} />
            <Route excat path="/contact_us" element={<Contact_Page />} />

            {/* Auth */}
            <Route
              excat
              path="/login"
              element={
                <GuestedRoute>
                  <Login_Page />
                </GuestedRoute>
              }
            />

            <Route
              excat
              path="forgot_password"
              element={<Reset_Password_Page />}
            />

            <Route
              excat
              path="/register"
              element={
                <GuestedRoute>
                  <Register_Page />
                </GuestedRoute>
              }
            />

            {/* Admin */}
            <Route excat path="/admin_panel" element={<Admin_Page />} />

            <Route
              excat
              path="/admin_panel/admin_add_trusted_company"
              element={<Admin_Add_Trusted_Company />}
            />

            <Route
              excat
              path="/admin_panel/admin_add_course"
              element={<Admin_Add_Course />}
            />

            <Route
              excat
              path="/admin_panel/course/:courseName/add_lesson"
              element={<Admin_Add_Lesson />}
            />

            <Route
              excat
              path="/admin_panel/course/:courseName"
              element={<Admin_Course_Page />}
            />

            <Route
              excat
              path="/admin_panel/add_intstructor"
              element={<Admin_Add_Instructor />}
            />

            <Route
              excat
              path="/admin_panel/students"
              element={<Admin_Students_Page />}
            />
          </Routes>
        </Router>
      </MainContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
