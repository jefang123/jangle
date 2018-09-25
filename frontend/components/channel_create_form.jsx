import React from 'react';

class ChannelCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel_name: "",
      server_id: this.props.match.params.serverId,
      channel_topic: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount () {
  //   this.props.fetchServer(this.props.match.params.serverId);
  // }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    // if (this.props.errors.length < 1) {
    //   this.props.handleClose();
    // }
    this.setState({
      channel_name: "",
      channel_topic: ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errors !== nextProps.errors) {
      if (nextProps.errors.length < 1) {
        this.props.handleClose();
      }
    }
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }
  render () {
    const errors = this.props.errors.map((errors, idx) => {
      return (
        <p key={idx} >
          {errors}
        </p>
      )
    })
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Channel Name</label>
        <div className="errors" >
          {errors}
        </div>
        <input 
        type='text' 
        value={this.state.channel_name} 
        onChange={this.update('channel_name')}/>
        <label>Topic</label>
        <input 
        type='text' 
        value={this.state.channel_topic} 
        onChange={this.update('channel_topic')}/>
        <button>Create Channel</button>
      </form>
    )
  }
}


export default ChannelCreateForm;
