import React, {Component} from 'react'
import FriendList from './friend_list'
import {connect} from 'react-redux'
import {getFriendTasks} from '../actions/get_friend_tasks'

class FriendsView extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected_friend: {}
    }
  }
  selectFriend(selected_friend){
    this.setState({selected_friend})
    this.props.getFriendTasks(selected_friend.id).then((data) => {
      console.log(data.payload.data);
    })
  }
  render(){
    console.log(this.props.friend_tasks);
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            <FriendList selectFriend={this.selectFriend.bind(this)} />
          </div>
          <div className="friend-display col-sm-8">
            {this.state.selected_friend != {} &&
              <div>
                <h3>{this.state.selected_friend.username}</h3>
              </div>

            }
            {Object.keys(this.state.selected_friend).length === 0 &&
              <div>
                <h3>Select a friend to view their info</h3>
              </div>
            }

          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {friend_tasks:state.friend_tasks}
}

export default connect(mapStateToProps, {getFriendTasks})(FriendsView)
