import React from 'react';
import SearchBar from './search-bar';

class ChannelCreateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      channel_name: this.props.channelName || "",
      server_id: this.props.match.params.serverId,
      channel_topic: this.props.channelTopic || ""
    };
    this.errors = [];
    this.names = this.props.names || [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak2(this.state);
    this.setState({
      channel_name: "",
      channel_topic: ""
    });
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errors !== nextProps.errors) {
      if (nextProps.errors.length < 1) {
        this.props.handleClose();
      }
    }
  }

  setUser (e) {
    this.names = [];
    this.setState({
      channel_name: e.target.innerText
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.serverId !== this.props.match.params.serverId) {
      this.setState({
        server_id: this.props.match.params.serverId
      })
    }
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
      let props = Object.keys(this.props.users2)
      this.names = props.filter(prop=> this.props.users2[prop].username.includes(`${this.state.channel_name}`))
      this.names = this.names.filter(name => this.props.users2[name].id !== this.props.currentUser.id)
      if (e.target.innerText = "") {
        this.names = [];
      }
    };
  }

  render () {
    let names = this.names.slice(0,5);

    if (this.state.channel_name === "") {
      names = [];
    }

    const search = names.map((name,idx) => {
      return (
        <li key={idx} onClick={this.setUser}>
          {this.props.users2[name].username}
        </li>
      )
    })

    const errors = this.props.errors.map((error, idx) => {
      return (
        <p key={idx} >
          {error}
        </p>
      )
    })

    let button; 
    let privateButton;
    if (this.state.channel_name === "") {
      button = <button disabled className="create-channel">Create Channel!</button>
      privateButton = <button disabled className="create-channel">Start Messaging!</button>
    } else {
      button = <button className="create-channel">Create Channel!</button>
      privateButton = <button className="create-channel">Start Messaging!</button>
    }
    if (parseInt(this.state.server_id) === window.homeId) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="errors" >
            {errors}
          </div>
          
          <h3>New Private Message</h3>
            {/* <SearchBar 
            field = {this.state.channel_name}
            type = "user"
            results = {this.names}
            set = {this.setUser}
            /> */}
            <input 
            type='text' 
            value={this.state.channel_name} 
            placeholder="Find Username..."
            onChange={this.update('channel_name')}/>
            <div className="user-search">
              {search}
            </div>
            {privateButton}
        </form>
      )
    } else {

      return (
        <form onSubmit={this.handleSubmit}>
          <h3>Create Channel</h3>
          <div className="errors" >
            {errors}
          </div>
            <input 
            type='text' 
            value={this.state.channel_name} 
            placeholder="Channel Name"
            onChange={this.update('channel_name')}/>
            <input 
            type='text' 
            value={this.state.channel_topic} 
            placeholder="Channel Topic"
            onChange={this.update('channel_topic')}/>
          {button}
        </form>
      )
    }
  }
}


export default ChannelCreateForm;
