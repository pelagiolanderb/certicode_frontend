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
import ProtectedRoute from "../src/route/ProtectedRoute";
import VerificationHandler from "./pages/AuthPages/VerificationHandler";
import SocialAuthHandler from "./pages/AuthPages/SocialAuthHandler";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import AdminSignIn from "./pages/AuthPages/AdminSignIn";

export default function App() {
  const token = localStorage.getItem("auth_token");
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
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
              path="/user-management"
              element={<ProtectedRoute component={UserProfiles} />}
            />
            <Route
              path="/archived"
              element={<ProtectedRoute component={Archived} />}
            />
            <Route path="/seminar-management/:id" element={<LandingSeminar />} />
            <Route path="/archived" element={<ProtectedRoute component={Archived} />} />

            {/* Others Page */}
            {/* <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} /> */}

            {/* Forms */}
            {/* <Route path="/form-elements" element={<FormElements />} /> */}

            {/* Tables */}
            {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

            {/* Ui Elements */}
            {/* <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} /> */}

            {/* Charts */}
            {/* <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} /> */}
          </Route>

          {/* <Route path="/" element={<ProtectedRoute component={MainLayout} />}>
            <Route
              path="dashboard"
              element={<ProtectedRoute component={Dashboard} />}
            />
            <Route
              path="seminar-page"
              element={<ProtectedRoute component={ManageSeminarPage} />}
            />
            <Route
              path="certificate-templates"
              element={<ProtectedRoute component={CertificateTemplates} />}
            />
            <Route
              path="view-seminar"
              element={<ProtectedRoute component={ViewSeminar} />}
            />
            <Route path="/participants" element={<ParticipantsList />} />
          </Route> */}

          {/* <Route path="/" element={<LandingPage />}>
            <Route index element={<HomePage />} />
            <Route path="seminar/:id" element={<SeminarPage />} />
          </Route> */}
          <Route
            path="/verify-email"
            element={
              token ? <Navigate to="/dashboard" replace /> : <VerifyEmail />
            }
          />
          <Route
            path="/verify-handler"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <VerificationHandler />
              )
            }
          />

          <Route
            path="/forgot-password"
            element={
              token ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
            }
          />

          <Route
            path="/password-reset/:token"
            element={
              token ? <Navigate to="/dashboard" replace /> : <ResetPassword />
            }
          />

          <Route
            path="/social-auth-handler"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <SocialAuthHandler />
              )
            }
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
          <Route
            index
            path="/dashboard"
            element={<ProtectedRoute component={Home} />}
          />
          {/* Auth Layout */}
          <Route
            path="/signin"
            element={token ? <Navigate to="/dashboard" replace /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/dashboard" replace /> : <SignUp />}
          />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
