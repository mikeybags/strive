import React, {Component} from 'react'

class DashboardTasks extends Component {
  render(){
    return (
      <li className="list-group-item">
        <h5>{this.props.title}</h5>
      </li>
    )
  }
}

export default DashboardTasks
