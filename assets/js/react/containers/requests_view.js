import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NotificationList from './notification_list';
import {connect} from 'react-redux';
import {getWagers} from '../actions/get_wagers';
import {getPoints} from '../actions/get_points';
import {updateWager} from '../actions/update_wager';
import {getRequests} from '../actions/get_requests';
import {updateFriend} from '../actions/update_friend';
import {updateGroup} from '../actions/update_group'

class RequestsView extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected_tab: 0,
    }
  }
  componentWillMount(){
    this.props.getWagers().then((data) => {

    })
    this.props.getRequests().then((data) => {

    })
  }
  acceptClick(notification, type){
    if (type === "friend"){
      this.props.updateFriend({status:"accept", friend:notification.user_id}).then((data) => {
        for(var i = 0; i < this.props.notifications.friend.length; i++) {
          if(this.props.notifications.friend[i].id == notification.id) {
            this.props.notifications.friend_message = `You are now friends with ${notification.user__username}.`;
            this.props.notifications.friend.splice(i, 1);
            this.setState({message: this.props.message});
          }
        }
      });
    }
    else if (type === "wager"){
      this.props.updateWager({status:"accept", wager:notification.id }).then((data) => {
        this.props.notifications.wager_message = `You have accepted ${notification.wagerer__username}'s challenge.`;
        this.props.getPoints();
        this.props.getWagers();
      });
    }
    else if(type === "group"){
      this.props.updateGroup({status:"accept", group_id: notification.group_id}).then((data) => {
        for(var i = 0; i < this.props.notifications.group.length; i++) {
          if(this.props.notifications.group[i].id == notification.id) {
            this.props.notifications.group_message = `You are now a member of the group "${notification.group__name}".`;
            this.props.notifications.group.splice(i, 1);
            this.setState({message: this.props.message})
          }
        }
      });
    }
  }
  denyClick(notification, type){
    if (type === "friend"){
      this.props.updateFriend({status:"deny", friendship_id: notification.id}).then((data) => {
        for(var i = 0; i < this.props.notifications.friend.length; i++) {
          if(this.props.notifications.friend[i].id == notification.id) {
            this.props.notifications.friend_message = `You have declined ${notification.user__username}'s friend request.`;
            this.props.notifications.friend.splice(i, 1);
            this.setState({message: this.props.message});
          }
        }
      });
    }
    else if (type === "wager"){
      this.props.updateWager({status:"deny", wager:notification.id }).then((data) => {
        this.props.notifications.wager_message = `You have declined ${notification.wagerer__username}'s wager.`;
        this.props.getPoints();
        this.props.getWagers();
      });
    }
    else if(type === "group"){
      this.props.updateGroup({status:"deny", group_member: notification.id}).then((data) => {
        for(var i = 0; i < this.props.notifications.group.length; i++) {
          if(this.props.notifications.group[i].id == notification.id) {
            this.props.notifications.group_message = `You have declined the invitation to the group "${notification.group__name}".`;
            this.props.notifications.group.splice(i, 1);
            this.setState({message: this.props.message})
          }
        }
      });
    }
  }
  handleSelect(index, last){
    this.setState({selected:index})
  }
  render(){
    return (
      <div>
      <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={this.state.selected}>
        <TabList>
          <Tab>Friends</Tab>
          <Tab>Wagers</Tab>
          <Tab>Groups</Tab>
        </TabList>

        <TabPanel>
          { this.props.notifications.friend_message &&
            <div className="row">
            <p className="col-sm-12 col-lg-8 request-notification">{this.props.notifications.friend_message}</p>
            </div>
          }
            <NotificationList notifications={this.props.notifications.friend} type="friend" acceptClick={this.acceptClick.bind(this)} denyClick={this.denyClick.bind(this)} />
        </TabPanel>
        <TabPanel>
          { this.props.notifications.wager_message &&
            <div className="row">
            <p className="col-sm-12 col-lg-8 request-message request-notification">{this.props.notifications.wager_message}</p>
            </div>
          }
          <NotificationList notifications={this.props.wager_requests} type="wager" acceptClick={this.acceptClick.bind(this)} denyClick={this.denyClick.bind(this)} />
        </TabPanel>
        <TabPanel>
          { this.props.notifications.group_message &&
            <div className="row">
            <p className="col-sm-12 col-lg-8 request-message request-notification">{this.props.notifications.group_message}</p>
            </div>
          }
          <NotificationList notifications={this.props.notifications.group} type="group" acceptClick={this.acceptClick.bind(this)} denyClick={this.denyClick.bind(this)} />
        </TabPanel>
      </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {wager_requests:state.wagers.received_requests, notifications: state.requests}
}

export default connect(mapStateToProps, {getWagers, updateWager, updateFriend, updateGroup, getPoints, getRequests})(RequestsView)
