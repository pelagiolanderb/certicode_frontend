import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import GuestForm from "./GuestForm";
import LandingHeader from "./LandingHeader";
import BeatLoader from "../../components/loading/loading";
import { ChevronLeftIcon } from "../../icons";
import useApiService from "../../api/useApiService";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PaymentForm from "../Forms/PaymentForm";

const SeminarPage = () => {
  const { id } = useParams();
  const [seminar, setSeminar] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { loading, error, get, post } = useApiService();
  const [isJoin, setIsJoin] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  let isAuth = localStorage.getItem("auth_token");
  let role = localStorage.getItem("role");

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        const data = await get(`/seminar/${id}`);
        // Add test price to seminar data
        setSeminar(
          {
            ...data.seminar,
          }
          // data.seminar
        );
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchSeminar();
  }, []);

  const handleJoin = async () => {
    setIsJoin(true);
    let userExist = localStorage.getItem("auth_token");
    let user_id = localStorage.getItem("user_id");

    try {
      if (userExist) {
        // For logged-in users
        if (seminar.price > 0) {
          setShowPaymentForm(true);
        } else {
          // Free seminar - register directly
          await post("/add-participant", {
            seminar_id: id,
            user_id,
            payment_status: "completed",
          });
          alert("Successfully joined the seminar!");
        }
      } else {
        // Guests - Show guest form first
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error joining seminar:", error);
      alert("Error joining seminar.");
    } finally {
      setIsJoin(false);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  if (loading && !isJoin) {
    return <BeatLoader />;
  }

  return (
    <>
      <div className={isAuth && role === "admin" ? "" : "p-4"}>
        {isAuth && role === "admin" ? (
          <>
            <div className="w-full flex justify-between">
              <Link
                to="/seminar-management"
                className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ChevronLeftIcon className="size-5" />
                Back
              </Link>
              <button className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex">
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  />
                </svg>
                Edit
              </button>
            </div>
          </>
        ) : (
          <PageBreadcrumb pageTitle={seminar.name_of_seminar} to="/" />
        )}
        <div className="my-2 mx-2">
          <img
            src={`${BACKEND_URL}/storage/${seminar.seminar_image}`}
            className="rounded-sm h-auto w-full"
          />
        </div>

        <div className="flex flex-row gap-6 mx-7">
          <div className="w-2/3 p-6">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
              {seminar.name_of_seminar}
            </h1>
            <p className="text-gray-600 mt-2 dark:text-gray-100">
              {seminar.description}
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                Topics Covered:
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-1 dark:text-gray-100">
                {seminar.topics}
              </ul>
            </div>

            <div className="mt-4 text-gray-700">
              <p className="flex items-center gap-2 dark:text-gray-100">
                <FaCalendarAlt className="text-gray-800 dark:text-gray-100" />
                <strong>Date:</strong> {seminar.date}
              </p>
              <p className="flex items-center gap-2 dark:text-gray-100">
                <FaMapMarkerAlt className="text-gray-800 dark:text-gray-100" />
                <strong>Location:</strong> {seminar.location}
              </p>
              <p className="flex items-center gap-2 dark:text-gray-100">
                <FaBuilding className="text-gray-800 dark:text-gray-100" />
                <strong>Organizer:</strong> {seminar.organization_name}
              </p>
            </div>
          </div>

          <div className="w-1/3 bg-white p-6 dark:bg-gray-900">
            <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center mb-4 dark:bg-gray-900 dark:border-gray-300">
              <img
                src={`${BACKEND_URL}/storage/${seminar.speaker_image}`}
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4 dark:text-gray-100">
                {seminar.speaker_name}
              </h3>
              <p className="text-gray-600 mt-2 dark:text-gray-100">
                {seminar.about_the_speaker}
              </p>
            </div>
            <div className="rounded-lg shadow-lg flex flex-col items-center text-center border border-gray-300 pb-5">
              <p className="text-green-700 font-semibold text-xl pt-3">
                {seminar.price === 0 ? (
                  "Free"
                ) : (
                  <span>&#8369; {seminar.price}</span>
                )}
              </p>

              <button
                className="mt-4 bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={handleJoin}
              >
                {loading
                  ? "Joining..."
                  : seminar.price > 0
                  ? "Register Now"
                  : "Join now for free"}
              </button>

              {showForm && (
                <GuestForm
                  isFormOpen={showForm}
                  setShowForm={setShowForm}
                  price={seminar.price}
                />
              )}

              {showPaymentForm && (
                <PaymentForm
                  setShowForm={setShowPaymentForm}
                  guestId={null}
                  userId={localStorage.getItem("user_id")}
                  seminarId={id}
                  price={seminar.price}
                  onSuccess={() => {
                    setShowPaymentForm(true);
                    alert("Successfully joined the seminar!");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeminarPage;
