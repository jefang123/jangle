import React from 'react';

class Modal extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClose = this.props.handleClose
    this.children = this.props.children
  }

  render () {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName} onClick={this.handleClose}>
        <section className='modal-main'>
          {this.children}
          <button
            className="modal-button"
            onClick={this.handleClose}
          >
            Cancel
          </button>
        </section>
      </div>
    )
  }
}

export default Modal;