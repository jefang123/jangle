import React from 'react';

class ChannelCreateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      channel_name: "",
      server_id: this.props.match.params.serverId,
      channel_topic: ""
    };
    this.errors = [];
    this.handleSubmit = this.handleSubmit.bind(this);
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

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }
  render () {
    const errors = this.props.errors.map((error, idx) => {
      return (
        <p key={idx} >
          {error}
        </p>
      )
    })

    let button; 
    if (this.state.channel_name === "") {
      button = <button disabled className="create-channel">Create Channel!</button>
    } else {
      button = <button className="create-channel">Create Channel!</button>
    }

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


export default ChannelCreateForm;

// class PrivateCreateForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       channel_name: "",
//       channel_topic: this.props.currentUser.username,
//       server_id: this.props.match.params.serverId
//     };
//     this.names = [];
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.setUser = this.setUser.bind(this);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     App.cable.subscriptions.subscriptions[0].speak2(this.state);
//     this.setState({
//       channel_name: "",
//       channel_topic: ""
//     });
//   }

//   componentWillReceiveProps(nextProps) {
//     if (this.props.errors !== nextProps.errors) {
//       if (nextProps.errors.length < 1) {
//         this.props.handleClose();
//       }
//     }
//   }

//   setUser (e) {
//     this.names = [];
//     this.setState({
//       channel_name: e.target.innerText
//     })
//   }

//   update(field) {
//     return (e) => {
//       this.setState({
//         [field]: e.target.value
//       });
//       let props = Object.keys(this.props.users2)
//       this.names = props.filter(prop=> this.props.users2[prop].username.includes(`${this.state.channel_name}`))
//       this.names = this.names.filter(name => this.props.users2[name].id !== this.props.currentUser.id)
//       if (e.target.innerText = "") {
//         this.names = [];
//       }
//     };
//   }
//   render () {
//     let names = this.names.slice(0,5);
//     const search = names.map((name,idx) => {
//       return (
//         <li key={idx} onClick={this.setUser}>
//           {this.props.users2[name].username}
//         </li>
//       )
//     })
//     const errors = this.props.errors.map((errors, idx) => {
//       return (
//         <p key={idx} >
//           {errors}
//         </p>
//       )
//     })
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div className="errors" >
//           {errors}
//         </div>
        
//         <h3>New Private Message</h3>
//           <input 
//           type='text' 
//           value={this.state.channel_name} 
//           placeholder="Find Username..."
//           onChange={this.update('channel_name')}/>
//           <div className="user-search">
//             {search}
//           </div>
//         <button className="create-channel">Start Messaging</button>
//       </form>
//     )
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     processForm: channel => dispatch(createChannel(channel)),
//     fetchUsers: () => dispatch(fetchUsers())
//   };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateCreateForm));