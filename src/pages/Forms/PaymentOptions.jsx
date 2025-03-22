import { useState } from 'react';
import gcashIcon from '../../assets/icons/gcash-icon.png';
import bankIcon from '../../assets/icons/bank-icon.png';
import payLaterIcon from '../../assets/icons/pay-later-icon.png';
import payNowIcon from '../../assets/icons/pay-now-icon.png';

const PaymentOptions = ({ onSelect }) => {
  const [step, setStep] = useState(1); // Step 1: Choose Pay Now / Pay Later
  const [selectedPayment, setSelectedPayment] = useState('');

  const paymentMethods = [
    { id: 'gcash', name: 'GCash', icon: gcashIcon },
    { id: 'bank', name: 'Bank Transfer', icon: bankIcon }
  ];

  const handleSelection = (method) => {
    if (method === 'payLater') {
      onSelect(method); // Pay Later works as before
    } else {
      setSelectedPayment(method);
      setStep(2); // Move to the next step for payment method selection
    }
  };

  return (
    <div className="p-4">
      {step === 1 ? (
        <>
          <h3 className="text-lg font-semibold mb-4">Select Payment Type</h3>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center p-4 border rounded-lg border-gray-200 hover:border-blue-300"
            >
              <img src={payNowIcon} alt="Pay Now icon" className="w-8 h-8 mr-3" />
              <span className="font-medium">Pay Now</span>
            </button>
            <button
              onClick={() => handleSelection('payLater')}
              className="flex items-center p-4 border rounded-lg border-gray-200 hover:border-blue-300"
            >
              <img src={payLaterIcon} alt="Pay Later icon" className="w-8 h-8 mr-3" />
              <span className="font-medium">Pay Later</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-1 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => onSelect(method.id)}
                className={`flex items-center p-4 border rounded-lg ${
                  selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <img src={method.icon} alt={`${method.name} icon`} className="w-8 h-8 mr-3 object-contain" />
                <span className="font-medium">{method.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentOptions;
