import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {connect} from 'react-redux';
import TasksView from './tasks_view';
import StatsView from './stats_view';
import FriendsView from './friends_view';
import GroupsView from './groups_view';
import PurchasesView from './purchases_view';
import RequestsView from './requests_view';
import WagersView from './wagers_view';
import {Link} from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: Number(this.props.routeParams.id)
    }
  }
  handleSelect(index, last) {
    this.setState({selected: index})
  }

  render() {
    return (
      <div>
        <div className="profile-header">
          <div className="picture-box no-gutters col-lg-2 col-md-3 col-xs-12">
            <img src={`static/images/${this.props.picture}`} className="img-responsive profile-picture"/>
          </div>
          <div className="profile-buttons col-lg-4 col-md-3 col-xs-12">
            <Link to="tasks/new" className="btn btn-primary btn-block">Add a task</Link>
            <Link to="tasks/edit" className="btn btn-info btn-block">Manage tasks</Link>
          </div>
          <div className="col-md-6 col-xs-12 profile-points-box text-center">
            <h4>Strive Points</h4>
            <p>Current Points: {this.props.points.open_balance}</p>
            <p>Wagered Points: {this.props.points.wager_balance}</p>
            <p>Daily Potential: {this.props.points.daily_potential[0]}/{this.props.points.daily_potential[1]}</p>
          </div>
        </div>
        <Nav bsStyle="pills" justified activeKey={this.state.selected} onSelect={this.handleSelect.bind(this)}>
          <NavItem className="nav-pill" eventKey={0}>Tasks</NavItem>
          <NavItem className="nav-pill" eventKey={1}>Stats</NavItem>
          <NavItem className="nav-pill" eventKey={2}>Friends</NavItem>
          <NavItem className="nav-pill" eventKey={3}>Group Challenges</NavItem>
          <NavItem className="nav-pill" eventKey={4}>Active Wagers</NavItem>
          <NavItem className="nav-pill" eventKey={5}>Requests</NavItem>
          <NavItem className="nav-pill" eventKey={6}>My Swag</NavItem>
        </Nav>
        {this.state.selected === 0 ? <TasksView /> : ''}
        {this.state.selected === 1 ? <StatsView /> : ''}
        {this.state.selected === 2 ? <FriendsView /> : ''}
        {this.state.selected === 3 ? <GroupsView /> : ''}
        {this.state.selected === 4 ? <WagersView /> : ''}
        {this.state.selected === 5 ? <RequestsView /> : ''}
        {this.state.selected === 6 ? <PurchasesView /> : ''}

        {/*<Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={this.state.selected}>
          <TabList id="home-tabs">
            <Tab>Tasks</Tab>
            <Tab>Stats</Tab>
            <Tab>Friends</Tab>
            <Tab>Group Challenges</Tab>
            <Tab>Active Wagers</Tab>
            <Tab>Requests</Tab>
            <Tab>My Swag</Tab>
          </TabList>

          <TabPanel>
            <TasksView/>
          </TabPanel>
          <TabPanel>
            <StatsView/>
          </TabPanel>
          <TabPanel>
            <FriendsView/>
          </TabPanel>
          <TabPanel>
            <GroupsView/>
          </TabPanel>
          <TabPanel>
            <WagersView/>
          </TabPanel>
          <TabPanel>
            <RequestsView/>
          </TabPanel>
          <TabPanel>
            <PurchasesView/>
          </TabPanel>
        </Tabs>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {picture: state.session.picture, points: state.points}
}

export default connect(mapStateToProps)(Profile)
