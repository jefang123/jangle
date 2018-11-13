import React from 'react';

class Loading extends React.PureComponent {
  render () {
    return (
    <div className="server-show">
       <section className= "channel-index"></section>
       <section className= "channel-show"></section>
       <section className= "user-index"></section>
    </div>
    )
  }

}

export default Loading;