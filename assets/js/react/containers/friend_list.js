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
          <div className="list-image">
            <img src={`/static/images/${friend.profile_picture}`} className="tiny-avatar" />
          </div>
            <p className="list-name">{friend.username}</p>
        </li>
      )
    })
  }
  render(){
    return (
      <div className="friend-list-container">
        <ul className="list-group friend-list">
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
