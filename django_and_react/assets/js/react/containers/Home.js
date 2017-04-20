import React, {Component} from 'react'
import {Link} from 'react-router'
import Feed from './feed'
import DashboardTasks from './dashboard_tasks'

class Home extends Component {
  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <Link to="tasks/new">Add a task</Link>
            <Link to="tasks/edit">Manage tasks</Link>
          </div>
          <div className="col-md-8">
            <p>Points info</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <DashboardTasks />
          </div>
          <div className="col-md-8">
            <Feed />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
