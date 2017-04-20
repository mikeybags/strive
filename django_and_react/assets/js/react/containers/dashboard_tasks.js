import React, {Component} from 'react'
import TaskComponent from '../components/task_component'


class DashboardTasks extends Component {
  render(){
    return (
      <ul className="list-group">
        <TaskComponent title="Daily Tasks" />
        <TaskComponent title="Ongoing Tasks" />
        <TaskComponent title="Upcoming Tasks" />
      </ul>
    )
  }
}

export default DashboardTasks
