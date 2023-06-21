import React from "react";

const Modal = ({ photo, handleModalClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={photo.title}
          className="modal-image"
        />
        <button onClick={handleModalClose} className="modal-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
