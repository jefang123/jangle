import React from 'react';

class Loading extends React.PureComponent {
  render () {
    return (
    <div className="server-show">
        <section className='channel-index'>
          <section className='server-heading'>
            <h3>{server.server_name}</h3>
            <br />
          </section>
          <ul>
            {channels}
          </ul>
          <div className="user-tab">
              <div>

              <img src={window.logo_url}></img>
              </div>
              <section>
                <p>{this.props.currentUser.username}</p>
                <p># {this.props.currentUser.id}</p>
              </section>
              <button onClick={this.props.logout}>Log Out</button>
          </div>
    
        </section>
        <section className='channel-show'>

        </section>
        <section className='user-index'>
          <h3> Users </h3>
          <div className="divider" />
          <ul>

          </ul>
        </section>
      </div>
    )
  }

}

export default Loading;