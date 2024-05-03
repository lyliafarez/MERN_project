import React, { FC, ReactNode } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DeletePopup: FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
        {children}
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
          onClick={onClose}>close
        </button>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={onClose}>Edit User
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
