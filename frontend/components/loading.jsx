import React from 'react';

class Loading extends React.PureComponent {
  render () {
    return (
    <div className="server-show">
       <section className= "channel-index">

        <section className= "server-heading">
          <h3> </h3>
        </section>
        <ul>
          <></>
          <></>
          <></>
          <></>
        </ul>
        <div className= "user-tab">
          <div>
            <img src=""></img>
          </div>
          <section>
            <p></p>
            <p></p>
          </section>
        </div>
       </section>

       <section className= "channel-show">
        <section className= "channel-show-heading">
          <h3></h3>
        </section>
        <div className= "divider"></div>
        <section className= "message-index">
        </section>
       </section>

       <section className= "user-index">
       </section>

    </div>
    )
  }

}

export default Loading;