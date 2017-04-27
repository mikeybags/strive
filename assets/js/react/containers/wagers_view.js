import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWagers} from '../actions/get_wagers'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



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
          <div>Good Times</div>
        </TabPanel>
        <TabPanel>
          <div>Good Times</div>
        </TabPanel>
      </Tabs>
    )
  }
}

function mapStateToProps(state){
  return {wagers:state.wagers}
}

export default connect(mapStateToProps, {getWagers})(WagersView)
