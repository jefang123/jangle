import React from 'react';

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      field : this.props.field || ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.results = this.props.results || [];
    this.type = this.props.type;
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.field !== nextProps.field) {
      this.setState({
        field: nextProps.field
      });
    }

    if (this.props.results !== nextProps.results) {
      this.results = nextProps.results;
    }

  }

  handleChange(e) {
    if (this.type === "server") {
      App.cable.subscriptions.subscriptions[0].search({server_name : e.target.value})
    } else if (this.type === "user") {
      App.cable.subscriptions.subscriptions[0].search({username : e.target.value})
    }

    this.setState({
      field: e.target.value
    })
  }

  render () {
    let text = "Search Servers";
    let klass = "server-search";
    if (this.type === "user") {
      text = "Find Username...";
      klass = "user-search";
    }

    let results = this.results.slice(0,5);
    if (this.state.field === "") {
      results = [];
    }

    const search = results.map((result,idx)=> {
      if (result.username && result.id === this.props.currentUser.id) {
        return null
      }
      return (
        <li key={idx} onClick={this.props.set}>
          {result.server_name || result.username}
        </li>
      )
    })

    return (
      <>
        <input 
          text = 'text'
          placeholder = {text}
          onChange = {this.handleChange}
          value = {this.state.field}
        />
        <div className={klass}>
          {search}
        </div>
      </>
    )
  }
}

export default Search;