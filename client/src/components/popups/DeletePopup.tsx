import React, { FC, ReactNode } from 'react';

interface PopupProps {
  isOpen: boolean;
  onDelete: () => void; // Function to handle deletion
  onClose: () => void; // Function to close the popup
  children: ReactNode; // Content for the popup
}

const DeletePopup: FC<PopupProps> = ({ isOpen, onDelete, onClose, children }) => {
  if (!isOpen) return null;

  // Handle clicks outside the popup
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the popup if clicking the backdrop
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick} // Backdrop closes the popup, not deletion
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        {children}
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
            onClick={onDelete} // Trigger deletion only on this button
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            onClick={onClose} // Close the popup without deletion
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
