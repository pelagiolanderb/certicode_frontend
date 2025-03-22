import { useState } from 'react';
import useApiService from '../../api/useApiService';
import GcashConfirmationModal from './GcashConfirmation';

const GcashForm = ({ participantId, userId, guestId, seminarId, seminarName, onSuccess, onBack }) => {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const [screenshot, setScreenshot] = useState(null);
  const [error, setError] = useState(null);

  const { loading, post } = useApiService();

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      setScreenshot(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPaymentDetails({
      seminarId,
      participantId,
      accountName,
      accountNumber,
      referenceNumber,
      screenshot,
      status: 'Pending Review'
    });
    setShowConfirmation(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('seminar_id', seminarId);
      formData.append('payment_method', 'Gcash');
      formData.append('account_name', accountName);
      formData.append('account_number', accountNumber);
      formData.append('reference_number', referenceNumber);
      formData.append('screenshot', screenshot);
      formData.append('payment_status', 'pending'); 



      const transactionResponse = await post('/create-transaction', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("Transaction Full Response:", transactionResponse);
      console.log("Transaction Response Data:", transactionResponse.data);

      const transactionId = transactionResponse.transaction.id;
      console.log("Transaction ID:", transactionId);


      const participantResponse = await post('/add-participant', {
        seminar_id: seminarId,
        guest_id: guestId || null,
        user_id: userId || null,
        transaction_id: transactionId,
      });

      if (!participantResponse.participant || !participantResponse.participant.id) {
        setError("Failed to create participant.");
        return;
      }

      console.log("Participant created:", participantResponse.participant);
      setShowConfirmation(false);
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <>
      {/* Add max-w and mx-auto classes to control width */}
      <div className="p-4 max-w-md mx-auto">
        <div className="mb-4"> {/* Reduced margin bottom */}
          <h3 className="text-lg font-semibold mb-2">GCash Payment Details</h3>
          <img
            className='w-32 mx-auto' // Reduced image size
            src="https://imgs.search.brave.com/k7zZ05FQh4FR0DqfZltimZm9EWHbOCYBjTpqM2KVc5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzc3LzkwLzI4/LzM2MF9GXzM3Nzkw/Mjg2Ml9uZ0ZNMjZF/SWk5VTBGT1FRaFZG/V1FpYnlBVlJNNWxz/ai5qcGc"
            alt="GCash Logo"
          />
          <p className="text-gray-600 text-sm text-center mt-2">
            Please send payment to: 09XX-XXX-XXXX
          </p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="space-y-3"> {/* Reduced spacing between elements */}
            {/* Input fields with smaller padding and text */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Account Name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full p-1.5 text-sm border rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="Enter GCash account name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full p-1.5 text-sm border rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="Enter GCash number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Reference Number
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                className="w-full p-1.5 text-sm border rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="Enter GCash reference number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Payment Screenshot
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                className="w-full p-1.5 text-sm border rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            <div className="flex space-x-4 mt-4"> {/* Reduced top margin */}
              <button
                type="submit"
                className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading || !screenshot}
              >
                {loading ? 'Processing...' : 'Submit Payment'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <GcashConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        paymentDetails={paymentDetails}
        seminarName={seminarName} // Make sure this prop is being passed
        onSubmit={handlePaymentSubmit}
      />
    </>
  );
};

export default GcashForm;

