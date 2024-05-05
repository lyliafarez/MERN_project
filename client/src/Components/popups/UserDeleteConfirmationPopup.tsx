import React, { FC } from 'react';

interface UserDeleteConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const UserDeleteConfirmationPopup: FC<UserDeleteConfirmationPopupProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose} // Close when the backdrop is clicked
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2>{message}</h2>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose} // Close the popup
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default UserDeleteConfirmationPopup;
