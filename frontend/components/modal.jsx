import React from 'react';

class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.handleClose = this.props.handleClose
    this.children = this.props.children
  }

  render () {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {this.children}
          <button
            onClick={this.handleClose}
          >
            Close
          </button>
        </section>
      </div>
    )
  }
}

export default Modal;