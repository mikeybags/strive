import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TasksView from './tasks_view'
import StatsView from './stats_view'
import FriendsView from './friends_view'
import GroupsView from './groups_view'

class Profile extends Component {
  handleSelect(index, last) {

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
      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={0}
      >

        <TabList>


          <Tab>Tasks</Tab>
          <Tab>Stats</Tab>
          <Tab>Friends</Tab>
          <Tab>Group Challenges</Tab>
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
      </Tabs>
    );
  }
}

export default Profile
