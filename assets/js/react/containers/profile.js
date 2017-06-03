import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'
import TasksView from './tasks_view'
import StatsView from './stats_view'
import FriendsView from './friends_view'
import GroupsView from './groups_view'
import PurchasesView from './purchases_view'
import RequestsView from './requests_view'
import WagersView from './wagers_view'
import {Link} from 'react-router'

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected:Number(this.props.params.id)
    }
  }
  handleSelect(index, last) {
    this.setState({selected:index})
  }

  render() {
    return (
      <div>
        <div className="profile-header">
          <div className="no-gutters col-md-3 col-xs-6">
            <img src={`static/images/${this.props.picture}`} className="img-responsive profile-picture" />
          </div>
          <div className="col-md-3 col-xs-6">
            <Link to="tasks/new" className="btn btn-primary btn-block">Add a task</Link>
            <Link to="tasks/edit" className="btn btn-info btn-block">Manage tasks</Link>
          </div>
          <div className="col-md-6 col-xs-12 profile-points-box text-center">
            <h4>Strive Points</h4>
            <p>Current Points: {this.props.points.open_balance}</p>
            <p>Wagered Points: {this.props.points.wager_balance}</p>
            <p>Daily Potential: {this.props.points.daily_potential[0]}/ {this.props.points.daily_potential[1]}</p>
          </div>
        </div>
        <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={this.state.selected} >
          <TabList>
            <Tab>Tasks</Tab>
            <Tab>Stats</Tab>
            <Tab>Friends</Tab>
            <Tab>Group Challenges</Tab>
            <Tab>Current Wagers</Tab>
            <Tab>Requests</Tab>
            <Tab>My Swag</Tab>
          </TabList>

          <TabPanel>
            <TasksView />
          </TabPanel>
          <TabPanel>
            <StatsView />
          </TabPanel>
          <TabPanel>
            <FriendsView />
          </TabPanel>
          <TabPanel>
            <GroupsView />
          </TabPanel>
          <TabPanel>
            <WagersView />
          </TabPanel>
          <TabPanel>
            <RequestsView />
          </TabPanel>
          <TabPanel>
            <PurchasesView />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {picture:state.session.picture, points:state.points}
}

export default connect(mapStateToProps)(Profile)
