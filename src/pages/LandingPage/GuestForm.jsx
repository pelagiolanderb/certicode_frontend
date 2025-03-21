import { useState } from "react";
import { useParams } from "react-router-dom";
import useApiService from "../../api/useApiService";
import PaymentForm from "../Forms/PaymentForm";

const GuestForm = ({ setShowForm, price }) => {
  const { id } = useParams();

  const [name, setGuestName] = useState("");
  const [address, setGuestAddress] = useState("");
  const [phone, setGuestPhone] = useState("");
  const [email, setGuestEmail] = useState("");

  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [guestId, setGuestId] = useState(null);

  const { loading, post } = useApiService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGuest = {
        seminar_id: id,
        name: name,
        address: address,
        phone: phone,
        email: email,
      };

      const response = await post('/create-guest', newGuest);
      
      if (price > 0) {
        // Save guestId first before proceeding to payment
        setGuestId(response.guest_id);

        // Proceed to transaction
        setShowPaymentForm(true);
      } else {
        // For free seminars, register directly
        await post("/add-participant", {
          seminar_id: id,
          guest_id: response.guest_id,
          payment_status: "completed",
        });
        alert("Successfully registered for the seminar!");
        setShowForm(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return alert(error);

  return (
    // Add backdrop-blur-sm to create blur effect
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Add animation and shadow to modal */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900">
            {showPaymentForm ? "Payment Information" : "Guest Information"}
          </h3>
          <button
            className="text-gray-400 hover:text-blue-900 rounded-lg w-8 h-8 flex items-center justify-center"
            onClick={() => setShowForm(false)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {showPaymentForm ? (
          <PaymentForm
            setShowForm={setShowPaymentForm}
            userId={null}
            guestId={guestId}
            seminarId={id}
            price={price}
            onSuccess={() =>{
              setShowPaymentForm(false);
              setShowForm(false);
              alert("Successfully joined the seminar!")
            }}
          />
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter your name"
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter your address"
                onChange={(e) => setGuestAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter your phone number"
                onChange={(e) => setGuestPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Enter your email address"
                onChange={(e) => setGuestEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-colors"
                disabled={loading}
              >
                {loading ? "Processing..." : price > 0 ? "Proceed to Payment" : "Register Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GuestForm;
