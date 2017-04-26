import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'
import TasksView from './tasks_view'
import StatsView from './stats_view'
import FriendsView from './friends_view'
import GroupsView from './groups_view'
import PurchasesView from './purchases_view'
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
    /*
      <Tabs/> is a composite component and acts as the main container.

      `onSelect` is called whenever a tab is selected. The handler for
      this function will be passed the current index as well as the last index.

      `selectedIndex` is the tab to select when first rendered. By default
      the first (index 0) tab will be selected.

      `forceRenderTabPanel` By default this react-tabs will only render the selected
      tab's contents. Setting `forceRenderTabPanel` to `true` allows you to override the
      default behavior, which may be useful in some circumstances (such as animating between tabs).


      <TabList/> is a composite component and is the container for the <Tab/>s.

      <Tab/> is the actual tab component that users will interact with.

      Selecting a tab can be done by either clicking with the mouse,
      or by using the keyboard tab to give focus then navigating with
      the arrow keys (right/down to select tab to the right of selected,
      left/up to select tab to the left of selected).

      The content of the <Tab/> (this.props.children) will be shown as the label.

      <TabPanel/> is the content for the tab.

      There should be an equal number of <Tab/> and <TabPanel/> components.
      <Tab/> and <TabPanel/> components are tied together by the order in
      which they appear. The first (index 0) <Tab/> will be associated with
      the <TabPanel/> of the same index. When you run this example with
      `selectedIndex` equal to 0, the tab with the label "Foo" will be selected
      and the content shown will be "Hello from Foo".

      As with <Tab/> the content of <TabPanel/> will be shown as the content.
    */
      <div>
        <div className="row">
          <div className="col-xs-4">
            <img src={`static/images/${this.props.picture}`} className="img-responsive picture-option" />
          </div>
          <div className="col-xs-4">
            <Link to="tasks/new">Add a task</Link>
            &nbsp;&nbsp;
            <Link to="tasks/edit">Manage tasks</Link>
          </div>
          <div className="col-xs-4">
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
