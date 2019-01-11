import React from 'react';

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      field : this.props.field || ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.results = this.props.servers || this.props.users || [];
    this.type = this.props.type;
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.field !== nextProps.field) {
      this.setState({
        field: nextProps.field
      });
    }

    if (this.props.servers !== nextProps.servers) {
      this.results = nextProps.servers;
    }
  }

  handleChange(e) {
    App.cable.subscriptions.subscriptions[0].search({server_name : e.target.value})
    this.setState({
      field: e.target.value
    })
  }

  render () {
    let text = "Search Servers";

    let results = this.results.slice(0,5);
    if (this.state.field === "") {
      results = [];
    }

    const search = results.map((result,idx)=> {
      return (
        <li key={idx} onClick={this.props.setServer}>
          {result.server_name}
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
        <div className="server-search">
          {search}
        </div>
      </>
    )
  }
}

export default Search;