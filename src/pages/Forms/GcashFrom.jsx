import { useState } from "react";
import useApiService from "../../api/useApiService";


const GcashForm = ({ participantId, userId, guestId, seminarId, seminarName, onSuccess, onBack }) => {
  const [step, setStep] = useState(1);
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // Success message state
  const { loading, post } = useApiService();

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!accountName || !accountNumber || !referenceNumber || !screenshot) {
      setError("All fields are required.");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handlePaymentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("seminar_id", seminarId);
      formData.append("payment_method", "Gcash");
      formData.append("account_name", accountName);
      formData.append("account_number", accountNumber);
      formData.append("reference_number", referenceNumber);
      formData.append("screenshot", screenshot);
      formData.append("payment_status", "pending");

      const transactionResponse = await post("/create-transaction", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const transactionId = transactionResponse.transaction.id;

      const participantResponse = await post("/add-participant", {
        seminar_id: seminarId,
        guest_id: guestId || null,
        user_id: userId || null,
        transaction_id: transactionId,
      });

      if (!participantResponse.participant || !participantResponse.participant.id) {
        setError("Failed to create participant.");
        return;
      }
      
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-4">

      {step === 1 && (
        <>
          <h3 className="text-lg font-semibold mb-4">GCash Payment Details</h3>
          <img
            className="w-32 mx-auto"
            src="https://imgs.search.brave.com/k7zZ05FQh4FR0DqfZltimZm9EWHbOCYBjTpqM2KVc5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzc3LzkwLzI4/LzM2MF9GXzM3Nzkw/Mjg2Ml9uZ0ZNMjZF/SWk5VTBGT1FRaFZG/V1FpYnlBVlJNNWxz/ai5qcGc"
            alt="GCash Logo"
          />
          <p className="text-gray-600 text-sm text-center">Please send payment to: 09XX-XXX-XXXX</p>

          <form onSubmit={handleNext} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Account Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter account name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Account Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Reference Number</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter reference number"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Payment Screenshot</label>
              <input type="file" accept="image/*" onChange={handleScreenshotChange} className="w-full p-2 border rounded" required />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-between mt-4">
              <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                Back
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                Next
              </button>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="text-lg font-semibold mb-4">Confirm Payment</h3>
          <p>
            <strong>Account Name:</strong> {accountName}
          </p>
          <p>
            <strong>Account Number:</strong> {accountNumber}
          </p>
          <p>
            <strong>Reference Number:</strong> {referenceNumber}
          </p>
          {screenshotPreview && <img src={screenshotPreview} alt="Screenshot Preview" className="mt-2 w-48 rounded border mx-auto" />}
          <p>
            <strong>Status:</strong> Pending Review
          </p>

          <div className="flex justify-between mt-4">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
              Back
            </button>
            <button onClick={handlePaymentSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GcashForm;
