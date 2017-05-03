import React, {Component} from 'react'
import FriendList from './friend_list'
import {connect} from 'react-redux'
import {getFriendTasks} from '../actions/get_friend_tasks'
import TaskTable from './task_table'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SparklineChart from '../components/sparkline_chart'
import WagerForm from './wager_form'


class FriendsView extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected_friend: {},
      selected_task: {}
    }
  }
  selectFriend(selected_friend){
    this.setState({selected_friend})
    this.props.getFriendTasks(selected_friend.id).then((data) => {
    })
  }
  selectTask(selected_task){
    this.setState({selected_task})
  }
  render(){
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            <FriendList selectFriend={this.selectFriend.bind(this)} />
          </div>
          <div className="friend-display col-sm-8">
            {Object.keys(this.state.selected_friend).length === 0 &&
              <div>
                <h5 className="friend-placeholder">Select a friend to view their info...</h5>
              </div>
            }
            {Object.keys(this.state.selected_friend).length > 0 &&
              <div>
                <h5 className="text-center">{this.state.selected_friend.username}</h5>
                <div className="row">
                  <div className="col-xs-6">
                    <p>Points Available: {this.state.selected_friend.open_balance}</p>
                    <p>Points in Limbo: {this.state.selected_friend.wager_balance}</p>
                  </div>
                  <div className="col-xs-6">
                    <SparklineChart data={[0,5,2,7,8]} color="purple" units="K" />
                  </div>
                </div>
                <h5 className="text-center">Tasks - Click to Wager</h5>
                {Object.keys(this.state.selected_task).length > 0 &&
                  <WagerForm friend={this.state.selected_friend} task={this.state.selected_task} balance={this.props.points.open_balance} />
                }
                <Tabs onSelect={this.handleSelect} selectedIndex={0}>
                  <TabList>
                    <Tab>Regular</Tab>
                    <Tab>Recurring</Tab>
                    <Tab>Major</Tab>
                  </TabList>

                  <TabPanel>
                    <TaskTable show={[["name","Name"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.friend_tasks.regular} edit={this.selectTask.bind(this)} />
                  </TabPanel>
                  <TabPanel>
                    <TaskTable show={[["name","Name"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.friend_tasks.recurring} edit={this.selectTask.bind(this)} />
                  </TabPanel>
                  <TabPanel>
                    <TaskTable show={[["name","Name"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.friend_tasks.major} edit={this.selectTask.bind(this)} />
                  </TabPanel>
                </Tabs>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {friend_tasks:state.friend_tasks, points:state.points}
}

export default connect(mapStateToProps, {getFriendTasks})(FriendsView)
