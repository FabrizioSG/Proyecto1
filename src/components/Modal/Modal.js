import './Modal.css'

function Modal({closeModal, children}) {
  return (
    <div className='modal fade show d-block' tabIndex="-1">
      <div className="modal-dialog modal-fullscreen .modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal">
                <span>&times;</span>
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
