import React from 'react';

const BpiConfirmationModal = ({ 
  isOpen, 
  onClose, 
  paymentDetails, 
  seminarName,
  onSubmit
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-[800px]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Review Payment Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-3 text-sm">
            <div>
              <h4 className="font-semibold">Seminar</h4>
              <p className="text-gray-600 font-medium">{seminarName || 'N/A'}</p>
            </div>

            <div>
              <h4 className="font-semibold">Account Details</h4>
              <p className="text-gray-600">Name: {paymentDetails?.accountName}</p>
            </div>

            <div>
              <h4 className="font-semibold">Payment Information</h4>
              <p className="text-gray-600">Reference: {paymentDetails?.referenceNumber}</p>
              <p className="text-gray-600">Method: BPI Bank Transfer</p>
              <p className="text-gray-600">Status: {paymentDetails?.status}</p>
            </div>
          </div>

          {paymentDetails?.screenshot && (
            <div className="w-1/2">
              <h4 className="font-semibold mb-2">Payment Screenshot</h4>
              <img 
                src={URL.createObjectURL(paymentDetails.screenshot)} 
                alt="Payment Screenshot" 
                className="w-full h-48 object-contain rounded border" 
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
          >
            Back to Edit
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Confirm & Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BpiConfirmationModal;