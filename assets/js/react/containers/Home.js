import React, {Component} from 'react'
import {Link} from 'react-router'
import Feed from './feed'
import DashboardTasks from './dashboard_tasks'
import {connect} from 'react-redux'


class Home extends Component {
  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <Link to="tasks/new">Add a task</Link>
            &nbsp;&nbsp;
            <Link to="tasks/edit">Manage tasks</Link>
          </div>
          <div className="col-md-7">
            <p>Current Points: {this.props.points.open_balance}</p>
            <p>Wagered Points: {this.props.points.wager_balance}</p>
            <p>Daily Potential: {this.props.points.daily_potential[0]}/ {this.props.points.daily_potential[1]}</p>
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

function mapStateToProps(state){
  return {points:state.points}
}

export default connect(mapStateToProps)(Home)
