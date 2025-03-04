import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
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
import SeminarManagement from "./pages/SeminarManagement/SeminarManagement";
import Participants from "./pages/Participants/Participants";
import CertificateManagement from "./pages/CertificateManagement/CertificateManagement";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/dashboard" element={<Home />} />
            <Route path="/seminar-management" element={<SeminarManagement />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/certificate-management" element={<CertificateManagement />} />
            <Route path="/user-management" element={<UserProfiles />} />
            <Route path="/achived" element={<UserProfiles />} />
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

          <Route path="/" element={<LandingPage />} />

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
