// import Carousel from "../../components/ui/carousel/Carousel";
// import seminar_image from "../../assets/images/seminar.jpg";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
// import profile from "../../assets/images/house_4.jpg";
import GuestForm from "./GuestForm";
// import { createParticipant } from "../../API/participantAPI";
import LandingHeader from "./LandingHeader";
import BeatLoader from "../../components/loading/loading";
import { ChevronLeftIcon } from "../../icons";
// import apiCreate from "../../api/apiCreate";
import useApiService from "../../api/useApiService";

const SeminarPage = () => {
  const { id } = useParams();
  const [seminar, setSeminar] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [joinLoading, setJoinLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { loading, error, get, post } = useApiService();
  const [isJoin, setIsJoin] = useState(false);

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [gcashOption, setGcashOption] = useState(null);
  const [bpiOption, setBpiOption] = useState(null);
  const userExist = localStorage.getItem("auth_token");
  const user_id = localStorage.getItem("user_id");

  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  let isAuth = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchSeminar = async () => {
      try {
        const data = await get(`/seminar/${id}`);
        setSeminar(data.seminar);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchSeminar();
  }, []);

  // const handleJoin = async () => {
  //   setIsJoin(true);
  //   let userExist = localStorage.getItem("auth_token");
  //   let user_id = localStorage.getItem("user_id");

  //   try {
  //     if (userExist) {
  //       await post('/add-participant', { seminar_id: id,  user_id});
  //       alert("Successfully joined the seminar!");
  //     } else {
  //       setShowForm(true);
  //     }
  //   } catch (error) {
  //     console.error("Error joining seminar:", error);
  //     alert("Error joining seminar.");
  //   } finally {
  //     setIsJoin(false);
  //   }
  // };

  const handleJoin = () => {
    if (!userExist) {
      setShowForm(true);
    }
    setShowPaymentOptions(true); // Show modal for payment options
  };

  // const handlePayNow = async () => {};

  const handlePayNow = () => {
    setShowPaymentMethods(true); // Show GCash & BPI options when "Pay Now" is clicked
  };

  const handlePayLater = async () => {
    setIsJoin(true);
    try {
      await post("/add-participant", {
        seminar_id: seminar?.id,
        user_id,
        isPaid: 0, // Unpaid but joined
      });

      alert("You have successfully joined the seminar. Please pay later.");
    } catch (error) {
      console.error("Error joining seminar:", error);
      alert("Error joining seminar.");
    }
    setIsJoin(false);
    setShowPaymentOptions(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  if (loading && !isJoin) {
    return <BeatLoader />;
  }

  return (
    <>
      <div className={isAuth ? "" : "relative pt-20"}>
        {isAuth ? (
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
          <LandingHeader />
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
                &#8369; {seminar.price}
              </p>

              <div>
                <button
                  className="mt-4 bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  onClick={handleJoin}
                  disabled={isJoin}
                >
                  {isJoin ? "Processing..." : "Join"}
                </button>

                {showPaymentOptions && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-96">
        <h2 className="text-xl font-semibold">Choose Payment Option</h2>
        <p className="text-gray-600">Would you like to pay now or later?</p>

        {/* Payment Selection */}
        {showPaymentMethods && (
          <div className="mt-4 text-left">
            {/* GCash Option */}
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="gcash"
                checked={selectedPayment === "gcash"}
                onChange={() => {
                  setSelectedPayment("gcash");
                  setGcashOption(null);
                  setBpiOption(null);
                }}
              />
              <span>GCash</span>
            </label>

            {/* Sub-options for GCash */}
            {selectedPayment === "gcash" && (
              <div className="ml-6 mt-2 text-left">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gcashOption"
                    value="qr"
                    checked={gcashOption === "qr"}
                    onChange={() => setGcashOption("qr")}
                  />
                  <span>QR Code</span>
                </label>

                {gcashOption === "qr" && (
                  <div className="mt-2">
                    <img
                      src="/path/to/gcash-qr.png"
                      alt="GCash QR Code"
                      className="mx-auto w-48"
                    />
                  </div>
                )}

                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="radio"
                    name="gcashOption"
                    value="account"
                    checked={gcashOption === "account"}
                    onChange={() => setGcashOption("account")}
                  />
                  <span>Account Number</span>
                </label>

                {gcashOption === "account" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter GCash Account Number"
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                )}
              </div>
            )}

            {/* BPI Option */}
            <label className="flex items-center space-x-2 mt-2">
              <input
                type="radio"
                name="payment"
                value="bpi"
                checked={selectedPayment === "bpi"}
                onChange={() => {
                  setSelectedPayment("bpi");
                  setGcashOption(null);
                  setBpiOption(null);
                }}
              />
              <span>BPI</span>
            </label>

            {/* Sub-options for BPI */}
            {selectedPayment === "bpi" && (
              <div className="ml-6 mt-2 text-left">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="bpiOption"
                    value="qr"
                    checked={bpiOption === "qr"}
                    onChange={() => setBpiOption("qr")}
                  />
                  <span>QR Code</span>
                </label>

                {bpiOption === "qr" && (
                  <div className="mt-2">
                    <img
                      src="/path/to/bpi-qr.png"
                      alt="BPI QR Code"
                      className="mx-auto w-48"
                    />
                  </div>
                )}

                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="radio"
                    name="bpiOption"
                    value="account"
                    checked={bpiOption === "account"}
                    onChange={() => setBpiOption("account")}
                  />
                  <span>Account Number</span>
                </label>

                {bpiOption === "account" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter BPI Account Number"
                      className="w-full border rounded-lg p-2"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Pay Now and Pay Later Buttons */}
        <div className="mt-6 space-x-2">
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            onClick={handlePayNow}
            disabled={isJoin}
          >
            {isJoin ? "Processing..." : "Pay Now"}
          </button>
          <button
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            onClick={handlePayLater}
            disabled={isJoin}
          >
            {isJoin ? "Joining..." : "Pay Later"}
          </button>
        </div>
      </div>
    </div>
  )}
              </div>

              {showForm && (
                <GuestForm isFormOpen={showForm} setShowForm={setShowForm} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeminarPage;
