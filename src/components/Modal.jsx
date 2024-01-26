// Modal.js
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fixed top-0  left-0 w-full h-[100vh] z-50   flex items-center justify-center">
      <div className="modalOverlay absolute top-0 left-0 w-full h-[100vh] bg-[#2f0a3d92] backdrop-blur-sm"></div>
      <div className="modal-content p-4 relative max-w-[630px] w-full z-[100] rounded-lg bg-white shadow-xl ">
        <div className="w-full flex justify-end">
          <span className="close cursor-pointer text-[#370757] text-[40px]  " onClick={onClose}><FaTimesCircle/></span>

        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
