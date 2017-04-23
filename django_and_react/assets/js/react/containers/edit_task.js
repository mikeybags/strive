import React, {Component} from 'react'
import TaskTable from '../components/task_table'
import TasksEditForm from '../containers/edit_tasks_form'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {connect} from 'react-redux'
import {getTasks} from '../actions/get_tasks'


class TasksEdit extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected_task: {},
      index: 0
    }
  }
  componentWillMount(){
    this.props.getTasks()
  }
  handleRowClick(selected_task){
    this.setState({selected_task});

  }
  handleSelect(index, last) {
    this.setState({index});
  }
  render(){
    return (
      <div>
        <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={this.state.index}>
          <TabList>
            <Tab>Regular</Tab>
            <Tab>Recurring</Tab>
            <Tab>Major</Tab>
          </TabList>

          <TabPanel>
            <TaskTable show={[["name","Name"], ["description","Description"], ["points","Worth"], ["end_date","Due Date"], ["public", "Public?"]]} tasks={this.props.tasks.regular} edit={this.handleRowClick.bind(this)} />
          </TabPanel>
          <TabPanel>
            <TaskTable show={[["name","Name"], ["description","Description"], ["points","Worth"], ["public", "Public?"]]} tasks={this.props.tasks.recurring} edit={this.handleRowClick.bind(this)} />
          </TabPanel>
          <TabPanel>
            <TaskTable show={[["name","Name"], ["description","Description"], ["points","Worth"], ["end_date","Due Date"], ["public", "Public?"]]} tasks={this.props.tasks.major} edit={this.handleRowClick.bind(this)} />
          </TabPanel>
        </Tabs>
        <TasksEditForm task={this.state.selected_task} />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {tasks:state.tasks}
}

export default connect(mapStateToProps, {getTasks})(TasksEdit)
