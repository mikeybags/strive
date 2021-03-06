import React, {Component} from 'react'
import {Link} from 'react-router'
import DashboardTasks from './dashboard_tasks'
import {connect} from 'react-redux'
import ActivityFeed from './feed'


class Home extends Component {
  render(){
    return (
      <div>
        <div className="row home-header">
          <div className="col-md-4 home-btns">
            <Link to="tasks/new" className="btn btn-primary btn-block">Add a task</Link>
            <Link to="tasks/edit" className="btn btn-info btn-block">Manage tasks</Link>
          </div>
          <div className="points-box col-md-8">
              <h4 className="text-center">Your Strive Points</h4>
              <p className="col-md-4 text-center">Current Points: {this.props.points.open_balance}</p>
              <p className="col-md-4 text-center">Wagered Points: {this.props.points.wager_balance}</p>
              <p className="col-md-4 text-center">Daily Potential: {this.props.points.daily_potential[0]}/{this.props.points.daily_potential[1]}</p>
          </div>
        </div>
        <div className="home-body">
          <div className="home-tasks">
            <DashboardTasks />
          </div>
          <div className="home-feed">
            <ActivityFeed />
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
