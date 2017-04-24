import React, {Component} from 'react'
import TaskTable from './task_table'

class DashboardTasks extends Component {
  render(){
    return (
      <li className="list-group-item" id="task-box">
        <h5 >{this.props.title}</h5>
        <TaskTable show={[["name","Name"]]} tasks={this.props.tasks} />
      </li>
    )
  }
}

export default DashboardTasks
