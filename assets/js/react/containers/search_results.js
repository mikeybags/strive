import React, {Component} from 'react';
import { connect } from 'react-redux';
import { requestFriend } from '../actions/request_friend'

class SearchResults extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      message: '',
      users: props.data.users
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps);
    this.setState({message: '', users: nextProps.data.users});
  }

  renderUsers(){
    const users = this.props.data.users;
    const term = this.props.data.term;
    if (users) {
      return users.map((user) => {
        return (
          <div key={user.id} className="user-detail">
            <div className="card search-result col-xs-12">
              <div className="search-img col-xs-12 col-sm-6 col-md-4">
                <img src={`static/images/${user.profile_picture}`} alt="Profile Picture" />
              </div>
              <div className="card-block col-xs-12 col-sm-6 col-md-4">
                <h4 className="card-title">{user.username}</h4>
                <h5 className="card-text">{user.first_name} {user.last_name}</h5>
                <p className="card-text">{user.tag_line}</p>
              </div>
              <div className="btn-area col-xs-12 col-sm-12 col-md-4">
                <button onClick={() => this.handleSentRequest(user.id)} className="btn btn-primary">Request Friendship</button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div>Enter a search term to search for a friend.</div>
      );
    }
  }

  handleSentRequest(id) {
    this.props.requestFriend(id);
    for(var i = 0; i < this.state.users.length; i++) {
      if(this.state.users[i].id == id) {
        let message = `Your friend request to ${this.state.users[i].username} has been sent.`;
        this.setState({message, data: this.state.users.splice(i, 1) });
      }
    }
  }

  render(){
    console.log('props in render', this.props);
    console.log('state in render', this.state);
    return (
      <div>
        {this.state.users ? <h5>Usernames matching "{this.state.term}" :</h5> : '' }
        {this.state.users && this.state.users.length === 0 && !this.state.message ? <p>No users found matching "{this.state.term}". Enter another term to search again.</p> : ''}
        {this.state.users && this.state.users.length === 0 && this.state.message ? <p>No more users found matching "{this.state.term}". Enter another term to search again.</p> : ''}
        {this.state.message ? <div className="card request-sent col-xs-12">{this.state.message}</div> : null}
        {this.renderUsers()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { 
    data: state.search
   }
}

export default connect(mapStateToProps, {requestFriend})(SearchResults);

