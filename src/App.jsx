import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import UserManagement from "./pages/UserManagement/UserManagement";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute component={AppLayout} onlyAdmin />}>
            <Route
              index
              path="/dashboard"
              element={<ProtectedRoute component={Home} onlyAdmin />}
            />
            <Route
              path="/seminar-management"
              element={<ProtectedRoute component={SeminarManagement} onlyAdmin />}
            />
            <Route
              path="/participants"
              element={<ProtectedRoute component={Participants} onlyAdmin />}
            />
            <Route
              path="/certificate-management"
              element={<ProtectedRoute component={CertificateManagement} onlyAdmin />}
            />
            <Route
              path="/archived"
              element={<ProtectedRoute component={Archived} onlyAdmin />}
            />
            <Route
              path="/seminar-management/:id"
              element={<ProtectedRoute component={LandingSeminar} onlyAdmin />}
            />
            {/* <Route
              path="/user-management"
              element={<ProtectedRoute component={UserManagement} />}
            /> */}
          </Route>

          <Route
            path="/verify-email"
            element={<ProtectedRoute component={VerifyEmail} onlyNonAdmin />}
          />
          <Route
            path="/verify-handler"
            element={<ProtectedRoute component={VerificationHandler} onlyNonAdmin />}
          />

          <Route
            path="/user-profile"
            element={<ProtectedRoute component={UserProfiles} onlyNonAdmin />}
          />

          <Route
            path="/forgot-password"
            element={<ProtectedRoute component={ForgotPassword} onlyNonAdmin />}
          />

          <Route
            path="/password-reset/:token"
            element={<ProtectedRoute component={ResetPassword} onlyNonAdmin />}
          />

          <Route path="/social-auth-handler" element={<SocialAuthHandler />} onlyNonAdmin />

          {/* <Route
              path="/@dmin-signin"
              element={
                token ? <Navigate to="/dashboard" replace /> : <AdminSignIn />
              }
            /> */}

          <Route path="/" element={<LandingPage />} />
          <Route path="/seminar-list" element={<LandingSeminarList />} />
          <Route path="/seminar/:id" element={<LandingSeminar />} />
          {/* Auth Layout */}
          <Route
            path="/signin"
            element={<ProtectedRoute component={SignIn} publicRoute />}
          />
          <Route
            path="/signup"
            element={<ProtectedRoute component={SignUp} publicRoute />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
