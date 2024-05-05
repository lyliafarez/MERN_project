import React from 'react';

interface ModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  message: string; 
}

const UserEditPopup: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) {
    return null; 
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2>{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserEditPopup;
