import { useState } from "react";
import { addGuest } from "../../api/guestAPI";
import { useParams } from "react-router-dom";

const GuestForm = (isFormOpen) => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(isFormOpen);

  const [guest_name, setGuestName] = useState("");
  const [guest_address, setGuestAddress] = useState("");
  const [guest_phone, setGuestPhone] = useState("");
  const [guest_email, setGuestEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newGuest = {
        seminar_id: id,
        guest_name: guest_name,
        guest_address: guest_address,
        guest_phone: guest_phone,
        guest_email: guest_email,
      };

      await addGuest(newGuest);
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return alert(error);

  return (
    <>
      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/50 z-50">
          <div className="p-4 w-full max-w-md bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Guest Information
              </h3>
              <button
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
                onClick={() => setShowForm(false)}
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
              <div className="mb-4">
                <label
                  htmlFor="guest_name"
                  className="block text-sm font-bold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="guest_name"
                  name="guest_name"
                  className="w-full mt-1 p-2 border rounded bg-gray-200 focus:bg-white focus:outline-none"
                  placeholder="Enter guest name"
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="guest_address"
                  className="block text-sm font-bold text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="guest_address"
                  name="guest_address"
                  className="w-full mt-1 p-2 border rounded bg-gray-200 focus:bg-white focus:outline-none"
                  placeholder="Enter guest address"
                  onChange={(e) => setGuestAddress(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="guest_phone"
                  className="block text-sm font-bold text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="guest_phone"
                  name="guest_phone"
                  className="w-full mt-1 p-2 border rounded bg-gray-200 focus:bg-white focus:outline-none"
                  placeholder="Enter guest phone number"
                  onChange={(e) => setGuestPhone(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="guest_email"
                  className="block text-sm font-bold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="guest_email"
                  name="guest_email"
                  className="w-full mt-1 p-2 border rounded bg-gray-200 focus:bg-white focus:outline-none"
                  placeholder="Enter guest email"
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-6 py-2 rounded font-bold uppercase"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestForm;
