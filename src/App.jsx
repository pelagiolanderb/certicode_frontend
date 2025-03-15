import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import VerifyEmail from "./pages/AuthPages/VerifyEmail";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import LandingSeminar from "./pages/LandingPage/LandingSeminar";
import LandingSeminarList from "./pages/LandingPage/LandingSeminarList";
import SeminarManagement from "./pages/SeminarManagement/SeminarManagement";
import Participants from "./pages/Participants/Participants";
import CertificateManagement from "./pages/CertificateManagement/CertificateManagement";
import Archived from "./pages/Archives/Archived";
import ProtectedRoute from "./route/ProtectedRoute";
import VerificationHandler from "./pages/AuthPages/VerificationHandler";
import SocialAuthHandler from "./pages/AuthPages/SocialAuthHandler";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import AdminSignIn from "./pages/AuthPages/AdminSignIn";
import UserProtectedRoute from "./route/UserProtectedRoute";
import UserManagement from "./pages/UserManagement/UserManagement";

export default function App() {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute component={AppLayout} />}>
            <Route
              index
              path="/dashboard"
              element={<ProtectedRoute component={Home} />}
            />
            <Route
              path="/seminar-management"
              element={<ProtectedRoute component={SeminarManagement} />}
            />
            <Route
              path="/participants"
              element={<ProtectedRoute component={Participants} />}
            />
            <Route
              path="/certificate-management"
              element={<ProtectedRoute component={CertificateManagement} />}
            />
            <Route
              path="/archived"
              element={<ProtectedRoute component={Archived} />}
            />
            <Route
              path="/seminar-management/:id"
              element={<ProtectedRoute component={LandingSeminar} />}
            />
            {/* <Route
              path="/user-management"
              element={<ProtectedRoute component={UserManagement} />}
            /> */}
          </Route>

          <Route
            path="/verify-email"
            element={
              token && role === 'user' ? <Navigate to="/" replace /> : <VerifyEmail />
            }
          />
          <Route
            path="/verify-handler"
            element={
              token ? (
                <Navigate to="/" replace />
              ) : (
                <VerificationHandler />
              )
            }
          />

          <Route
            path="/user-profile"
            element={<UserProtectedRoute component={UserProfiles} />}
          />

          <Route
            path="/forgot-password"
            element={<UserProtectedRoute component={ForgotPassword} />}
          />

          <Route
            path="/password-reset/:token"
            element={<UserProtectedRoute component={ResetPassword} />}
          />

          <Route
            path="/social-auth-handler"
            element={<SocialAuthHandler />}
          />

          <Route
            path="/@dmin-signin"
            element={
              token ? <Navigate to="/dashboard" replace /> : <AdminSignIn />
            }
          />

          <Route path="/" element={<LandingPage />} />
          <Route path="/seminar-list" element={<LandingSeminarList />} />
          <Route path="/seminar/:id" element={<LandingSeminar />} />
          {/* Auth Layout */}
          <Route
            path="/signin"
            element={
              !token ? (
                <SignIn />
              ) : token && role === "user" ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="/signup"
            element={
              !token ? (
                <SignUp />
              ) : token && role === "user" ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
