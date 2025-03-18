import { useState } from 'react';
import useApiService from '../../api/useApiService';

const BpiForm = ({ guestId, seminarId, onSuccess, onBack }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [error, setError] = useState(null);

    const { loading, post } = useApiService();

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            setScreenshot(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('guest_id', guestId);
            formData.append('seminar_id', seminarId);
            formData.append('payment_method', 'bpi');
            formData.append('card_number', cardNumber);
            formData.append('expiry_date', expiryDate);
            formData.append('cvc', cvc);
            formData.append('screenshot', screenshot);
            formData.append('payment_status', 'pending');

            await post('/process-payment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            await post('/add-participant', {
                seminar_id: seminarId,
                user_id: user_id,
                guest_id: guestId,
                payment_status: 'pending',
                payment_method: 'bpi'
              });
              
              alert('Payment submitted for review!');
              onSuccess();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">BPI Payment Details</h3>
                <img className='w-1/2 mx-auto' src="https://imgs.search.brave.com/k7zZ05FQh4FR0DqfZltimZm9EWHbOCYBjTpqM2KVc5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzc3LzkwLzI4/LzM2MF9GXzM3Nzkw/Mjg2Ml9uZ0ZNMjZF/SWk5VTBGT1FRaFZG/V1FpYnlBVlJNNWxz/ai5qcGc" alt="" />
                <p className="text-gray-600 text-sm">
                Account Number: 1234 5678 9012 3456
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Card Number
                        </label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border rounded bg-gray-200 focus:bg-white focus:outline-none"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded bg-gray-200 focus:bg-white focus:outline-none"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                CVC
                            </label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded bg-gray-200 focus:bg-white focus:outline-none"
                                placeholder="123"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Payment Screenshot
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            className="w-full p-2 border rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}

                    <div className="flex space-x-4 mt-6">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            disabled={loading || !screenshot}
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BpiForm;