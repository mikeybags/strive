import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NotificationList from './notification_list';
import {connect} from 'react-redux'
import {getWagers} from '../actions/get_wagers'
import {getPoints} from '../actions/get_points'
import {updateWager} from '../actions/update_wager'

class RequestsView extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected_tab: 0
    }
  }
  componentWillMount(){
    this.props.getWagers().then((data) => {

    })
  }
  acceptClick(notification, type){
    if (type === "friend"){

    }
    else if (type === "wager"){
      this.props.updateWager({status:"accept", wager:notification.id }).then((data) => {
        this.props.getPoints();
        this.props.getWagers();

      })
    }
    else if(type === "group"){

    }
  }
  denyClick(notification, type){
    if (type === "friend"){

    }
    else if (type === "wager"){
      this.props.updateWager({status:"deny", wager:notification.id }).then((data) => {
        this.props.getPoints();
        this.props.getWagers();
      })
    }
    else if(type === "group"){

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
          <NotificationList notifications={[]} type="friend" acceptClick={this.acceptClick.bind(this)} denyClick={this.denyClick.bind(this)} />
        </TabPanel>
        <TabPanel>
          <NotificationList notifications={this.props.wager_requests} type="wager" acceptClick={this.acceptClick.bind(this)} denyClick={this.denyClick.bind(this)} />
        </TabPanel>
        <TabPanel>
          <NotificationList notifications={[]} type="group" acceptClick={this.acceptClick.bind(this)} denyClick={this.denyClick.bind(this)} />
        </TabPanel>
      </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {wager_requests:state.wagers.received_requests}
}

export default connect(mapStateToProps, {getWagers, updateWager, getPoints})(RequestsView)
