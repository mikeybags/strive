import React, {Component} from 'react';
import { connect } from 'react-redux';
import { requestFriend } from '../actions/request_friend'

class SearchResults extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  renderUsers(){
    const users = this.props.data.users;
    const term = this.props.data.term;
    return users.map((user) => {
      return (
        <div key={user.id} className="user-detail col-lg-4 col-sm-6 col-xs-12">
          <div  className="card">
            <img src={`static/images/${user.profile_picture}`} alt="Profile Picture" />
            <div className="card-block">
              <h4 className="card-title">{user.username}</h4>
              <h5 className="card-text">{user.first_name} {user.last_name}</h5>
              <p className="card-text">{user.tag_line}</p>
              <button onClick={() => this.handleSentRequest(user.id)} className="btn btn-primary">Request Friendship</button>
            </div>
          </div>
        </div>
      )
    });
  }

  handleSentRequest(id) {
    this.props.requestFriend(id);
    for(var i = 0; i < this.props.data.users.length; i++) {
      if(this.props.data.users[i].id == id) {
        this.props.data.users.splice(i, 1);
        this.setState({search: this.props.data})
      }
    }
  }

  render(){
    return (
      <div>
        <h5>Usernames matching "{this.props.data.term}":</h5>
          {this.renderUsers()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { data: state.search }
}

export default connect(mapStateToProps, {requestFriend})(SearchResults);
