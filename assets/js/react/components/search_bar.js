import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { friendSearch } from '../actions/friend_search'
import { FormGroup, FormControl, Button } from 'react-bootstrap'



class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  static contextTypes = {
    router:PropTypes.object
  };
  onInputChange(event) {
    this.setState( { term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.friendSearch(this.state.term)
      .then((actionObject) => {
        this.context.router.push('search_results')
      });
    this.setState({ term: '' });
  }

  render() {
    return (
      <form type="get" onSubmit={this.onFormSubmit} className="form-inline" id="nav-form">
        <input
          placeholder = "Search for Friends"
          id = "nav-search"
          className = "form-control mr-sm-2"
          value = {this.state.term}
          onChange = {this.onInputChange} />
        <span className="input-group-btn">
          <button id="nav-submit" className="form-control mr-sm-2" type="submit">Submit</button>
        </span>
      </form>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ friendSearch }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
