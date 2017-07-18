import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWagers} from '../actions/get_wagers'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WagerList from '../components/wager_list'



class WagersView extends Component {
  componentWillMount(){
    this.props.getWagers()
  }
  render(){
    return (
      <Tabs onSelect={this.handleSelect} selectedIndex={0}>
        <TabList>
          <Tab>Sent</Tab>
          <Tab>Received</Tab>
        </TabList>

        <TabPanel>
          <WagerList type="sent" wagers={this.props.wagers.sent_active} />
        </TabPanel>
        <TabPanel>
          <WagerList type="received" wagers={this.props.wagers.received_active} />
        </TabPanel>
      </Tabs>
    )
  }
}

function mapStateToProps(state){
  return {wagers:state.wagers}
}

export default connect(mapStateToProps, {getWagers})(WagersView)
