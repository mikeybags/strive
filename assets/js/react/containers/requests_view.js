import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NotificationList from './notification_list';

class RequestsView extends Component {
  acceptClick(notification, type){
    if (type === "friend"){

    }
    else if (type === "wager"){

    }
    else if(type === "group"){

    }
  }
  denyClick(notification, type){
    if (type === "friend"){

    }
    else if (type === "wager"){

    }
    else if(type === "group"){

    }
  }
  render(){
    return (
      <div>
      <Tabs onSelect={this.handleSelect} selectedIndex={0}>
        <TabList>
          <Tab>Friends</Tab>
          <Tab>Wagers</Tab>
          <Tab>Groups</Tab>
        </TabList>

        <TabPanel>
          <NotificationList notifications={[]} type="friend" acceptClick={this.acceptClick} denyClick={this.denyClick} />
        </TabPanel>
        <TabPanel>
          <NotificationList notifications={[]} type="wager" acceptClick={this.acceptClick} denyClick={this.denyClick} />
        </TabPanel>
        <TabPanel>
          <NotificationList notifications={[]} type="group" acceptClick={this.acceptClick} denyClick={this.denyClick} />
        </TabPanel>
      </Tabs>
      </div>
    )
  }
}

export default RequestsView
