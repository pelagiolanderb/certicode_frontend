import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApiService from "../../api/useApiService";

const GuestForm = ({ isFormOpen, setShowForm }) => {
  const { id } = useParams();

  const [name, setGuestName] = useState("");
  const [address, setGuestAddress] = useState("");
  const [phone, setGuestPhone] = useState("");
  const [email, setGuestEmail] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [error, setError] = useState(null);
  const [isJoin, setIsJoin] = useState(false);
  const { loading, post, get } = useApiService();
  const [seminar, setSeminar] = useState([]);

  const user_id = localStorage.getItem("user_id");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGuest = {
        seminar_id: id,
        name,
        address,
        phone,
        email,
      };
  
      const response = await post('/create-guest', newGuest);
      await post("/add-participant", { seminar_id: id, guest_id: response.guest_id });
      console.log("Guest response:", response);
      alert("You successfully joined this seminar.");
      setShowPaymentOptions(true); // Show payment options first
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePayNow = async () => {
    setIsJoin(true);
  
    if (!seminar?.id) {
      console.error("Missing seminar_id");
      alert("Invalid seminar. Please try again.");
      setIsJoin(false);
      return;
    }
  
    // Create a temporary user object for guests
    // const participantId = user_id || "guest_" + Date.now(); // Generate guest ID
    
    const payload = {
      seminar_id: seminar.id,
      participant_id: response.guest_id,
    };
  
    console.log("Sending payment payload:", payload); // Debugging step
  
    try {
      const response = await post("/transactions/pay", payload);
  
      console.log("Payment response:", response);
  
      if (response.paymongo_link) {
        window.location.href = response.paymongo_link;
      } else {
        alert("Failed to generate payment link.");
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert("Payment failed. Please try again.");
    }
  
    setIsJoin(false);
    setShowPaymentOptions(false);
  };
  
  const handlePayLater = async () => {
    setIsJoin(true);
  
    if (!seminar?.id) {
      console.error("Missing seminar_id");
      alert("Invalid seminar. Please try again.");
      setIsJoin(false);
      return;
    }
  
    // Handle guest users by storing their name & email
    // const participantId = user_id || "guest_" + Date.now(); // Generate guest ID
  
    try {
      await post("/add-participant", {
        seminar_id: seminar.id,
        participant_id: user_id,
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

  if (error) return alert(error);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/50 z-50">
        <div className="p-4 w-full max-w-md bg-white rounded-lg shadow-sm">
          {!showPaymentOptions ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Guest Information</h3>
                <button
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
                  onClick={() => {
                    setShowForm(false);
                    setShowPaymentOptions(false);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4">
                <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-3" onChange={(e) => setGuestName(e.target.value)} />
                <input type="text" placeholder="Address" className="w-full p-2 border rounded mb-3" onChange={(e) => setGuestAddress(e.target.value)} />
                <input type="tel" placeholder="Phone" className="w-full p-2 border rounded mb-3" onChange={(e) => setGuestPhone(e.target.value)} />
                <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={(e) => setGuestEmail(e.target.value)} />
                <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded font-bold uppercase w-full">
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center p-4">
              <h2 className="text-lg font-semibold">Choose Payment Option</h2>
              <p className="text-gray-600">Would you like to pay now or later?</p>
              <div className="mt-4 space-x-4">
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        onClick={handlePayNow}
                        disabled={isJoin}
                      >
                        {isJoin ? "Processing..." : "Pay Now"}
                      </button>
                      <button
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        onClick={handlePayLater}
                        disabled={isJoin}
                      >
                        {isJoin ? "Joining..." : "Pay Later"}
                      </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GuestForm;
