import React, { FC, ReactNode } from 'react';

interface PopupProps {
  isOpen: boolean;
  onDelete: () => void; // Function to handle deletion
  children: ReactNode; // Content for the popup
}

const DeletePopup: FC<PopupProps> = ({ isOpen, onDelete, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onDelete(); // Call the delete handler if the backdrop is clicked
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        {children}
        <div className="mt-4 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
