import React from 'react';

const Modal = ({show, children, handleClose}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button className='modal-button' onClick={handleClose} >
          Cancel
        </button>
      </section>
    </div>
  )
}

export default Modal;