import React, {Component} from 'react'
import {getFriends} from '../actions/get_friends'
import {connect} from 'react-redux'

class FriendList extends Component {
  componentWillMount(){
    this.props.getFriends().then((data) => {
    })
  }
  renderFriends(){
    return this.props.friends.map((friend) => {
      return (
        <li key={friend.username} className="list-group-item row friend-list-item" onClick={() => {this.props.selectFriend(friend)}}>
          <div className="col-xs-5">
            <img src={`/static/images/${friend.profile_picture}`} className="img-responsive tiny-avatar" />
          </div>
          <div className="col-xs-6">
            <p>{friend.username}</p>
          </div>
        </li>
      )
    })
  }
  render(){
    return (
      <div className="friend-list">
        <ul className="list-group">
          {this.renderFriends()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {friends:state.friends}
}

export default connect(mapStateToProps, {getFriends})(FriendList)
