// ModalComponent.js
import React from 'react';
import Modal from 'react-modal';

const ModalComponent = ({ isOpen, onRequestClose, contentLabel, title, description, onCloseAction }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel={contentLabel}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{description}</p>
                <button onClick={onCloseAction}>Close</button>
            </div>
        </Modal>
    );
};

export default ModalComponent;
