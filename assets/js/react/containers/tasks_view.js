import React, {Component} from 'react'
import TaskTable from './task_table'
import {connect} from 'react-redux'
import {getTasks} from '../actions/get_tasks'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



class TasksView extends Component {
  componentWillMount(){
    this.props.getTasks()
  }
  render(){
    return (
      <Tabs onSelect={this.handleSelect} selectedIndex={0}>
        <TabList>
          <Tab>Regular</Tab>
          <Tab>Recurring</Tab>
          <Tab>Major</Tab>
        </TabList>

        <TabPanel>
          <TaskTable show={[["name","Name"], ["description","Description"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.tasks.regular} />
        </TabPanel>
        <TabPanel>
          <TaskTable show={[["name","Name"], ["description","Description"], ["points","Worth"]]} tasks={this.props.tasks.recurring} />
        </TabPanel>
        <TabPanel>
          <TaskTable show={[["name","Name"], ["description","Description"], ["points","Worth"], ["end_date","Due Date"]]} tasks={this.props.tasks.major} />
        </TabPanel>
      </Tabs>
    )
  }
}

function mapStateToProps(state){
  return {tasks:state.tasks}
}

export default connect(mapStateToProps, {getTasks})(TasksView)
