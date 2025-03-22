import { useState } from 'react';
import gcashIcon from '../../assets/icons/gcash-icon.png'
import bankIcon from '../../assets/icons/bank-icon.png'
import payLaterIcon from '../../assets/icons/pay-later-icon.png'

const PaymentOptions = ({ onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: gcashIcon
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: bankIcon
    },
    {
      id: 'payLater',
      name: 'Pay Later',
      icon: payLaterIcon
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    onSelect(methodId);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      <div className="grid grid-cols-1 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id)}
            className={`
              flex items-center p-4 border rounded-lg
              ${selectedMethod === method.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'}
            `}
          >
            <img 
              src={method.icon} 
              alt={`${method.name} icon`}
              className="w-8 h-8 mr-3 object-contain"
            />
            <span className="font-medium">{method.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;