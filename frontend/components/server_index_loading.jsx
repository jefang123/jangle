import React from 'react';

class ServerLoad extends React.PureComponent {
  render() {
    return(
      <section className="server-index server-load">
        <ul>
          <li>
            <img></img>
          </li>
          <div className="divider"></div>
          <li>
            <img></img>
          </li>
          <li>
            <img></img>
          </li>
          <li>
            <img></img>
          </li>
          <li>
            <img></img>
          </li>
          <li>
            <button className="create-server" >+</button>
          </li>
        </ul>
      </section>
    );
  }
}

export default ServerLoad