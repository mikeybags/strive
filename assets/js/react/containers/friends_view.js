import React, {Component} from 'react'
import FriendList from './friend_list'
import {connect} from 'react-redux'
import {getFriendTasks} from '../actions/get_friend_tasks'
import TaskTable from './task_table'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SparklineChart from '../components/sparkline_chart'


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
    })
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
                <h5>Select a friend to view their info</h5>
              </div>
            }
            {this.state.selected_friend != {} &&

              <div>
                <h5 className="text-center">{this.state.selected_friend.username}</h5>
                <div className="row">
                  <div className="col-xs-6">
                    <p>Points Available: {this.state.selected_friend.open_balance}</p>
                    <p>Points in Limbo: {this.state.selected_friend.wager_balance}</p>
                  </div>
                  <div className="col-xs-6">
                    <SparklineChart className="sparkline" data={[0,5,2,7,8]} color="purple" units="K" />
                  </div>
                </div>
                <Tabs onSelect={this.handleSelect} selectedIndex={0}>
                  <TabList>
                    <Tab>Regular</Tab>
                    <Tab>Recurring</Tab>
                    <Tab>Major</Tab>
                  </TabList>

                  <TabPanel>
                    <TaskTable show={[["name","Name"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.friend_tasks.regular} />
                  </TabPanel>
                  <TabPanel>
                    <TaskTable show={[["name","Name"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.friend_tasks.recurring} />
                  </TabPanel>
                  <TabPanel>
                    <TaskTable show={[["name","Name"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.friend_tasks.major} />
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
  return {friend_tasks:state.friend_tasks}
}

export default connect(mapStateToProps, {getFriendTasks})(FriendsView)
