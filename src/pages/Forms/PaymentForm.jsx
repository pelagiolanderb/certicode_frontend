import { useState, useEffect } from 'react';
import useApiService from "../../api/useApiService";
import PaymentOptions from './PaymentOptions';
import GcashForm from './GcashFrom';
import BpiForm from './BpiForm';
import SuccessToast from './SuccessToast';

const PaymentForm = ({ setShowForm, guestId, userId, seminarId, onSuccess, price }) => {
    const [seminar, setSeminar] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { loading, post, get, patch } = useApiService(); // Add get from useApiService
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSuccess = () => {
        if (showSuccess) return; 
    
        setShowSuccess(true);
    };

    // Add fetch seminar effect
    useEffect(() => {
        const fetchSeminar = async () => {
            try {
                const response = await get(`/seminar/${seminarId}`);
                setSeminar(response.seminar);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchSeminar();
    }, [seminarId]);

    // Add function to handle free seminars
    const handleFreeSeminar = async () => {
        try {
            const registrationData = {
                guest_id: guestId,
                user_id: userId,
                seminar_id: seminarId,
                payment_status: 'completed'
            };

            await post('/add-participant', registrationData);
            setShowForm(false);

        } catch (error) {
            setError(error.message);
        }
    };

    // Check if seminar is free at component mount
    useEffect(() => {
        if (price === 0) {
            handleFreeSeminar();
            alert("Successfully joined the seminar!")
        }
    }, []);

    const handlePayLater = async () => {
        try {
            const paymentData = {
                guest_id: guestId,
                user_id: userId,
                seminar_id: seminarId,
                account_name: null,
                account_number: null,
                reference_number: null,
                screenshot: null,
                payment_method: 'pay_later',
                payment_status: 'pending'
            };

            // Create transaction
            const transactionResponse = await post('/create-transaction', paymentData);
            if (!transactionResponse.transaction || !transactionResponse.transaction.id) {
                setError("Transaction creation failed.");
                return;
            }

            const transactionId = transactionResponse.transaction.id;

            // Register participant
            const participantResponse = await post('/add-participant', {
                seminar_id: seminarId,
                guest_id: guestId || null,
                user_id: userId || null,
                transaction_id: transactionId,
            });

            if (!participantResponse.participant || !participantResponse.participant.id) {
                setError("Participant creation failed.");
                return;
            }

            handleSuccess();
        } catch (error) {
            setError(error.message);
        }
    };





    const handlePaymentMethodSelect = (methodId) => {
        if (isProcessing) return; // Prevent multiple requests

        if (methodId === 'payLater') {
            setIsProcessing(true);
            handlePayLater().finally(() => setIsProcessing(false));
        } else {
            setPaymentMethod(methodId);
            setShowPaymentDetails(true);
        }
    };


    if (error) return alert(error);

    return (
        <>
            {showSuccess && <SuccessToast message="Successfully joined the seminar!" duration={3000} />}
            {price > 0 ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="p-4 w-full max-w-md bg-white rounded-lg shadow-sm">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Payment Information
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
    
                        <div className="p-4">
                            {!showPaymentDetails ? (
                                <PaymentOptions onSelect={handlePaymentMethodSelect} />
                            ) : (
                                <div>
                                    {paymentMethod === 'gcash' && (
                                        <GcashForm
                                            guestId={guestId}
                                            userId={userId}
                                            seminarId={seminarId}
                                            seminarName={seminar?.name_of_seminar}
                                            onSuccess={handleSuccess}
                                            onBack={() => setShowPaymentDetails(false)}
                                        />
                                    )}
    
                                    {paymentMethod === 'bank' && (
                                        <BpiForm
                                            userId={userId}
                                            guestId={guestId}
                                            seminarId={seminarId}
                                            seminarName={seminar?.name_of_seminar}
                                            onSuccess={handleSuccess}
                                            onBack={() => setShowPaymentDetails(false)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
    
};

export default PaymentForm;