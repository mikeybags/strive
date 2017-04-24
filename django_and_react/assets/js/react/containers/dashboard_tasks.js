import React, {Component} from 'react'
import TaskComponent from '../components/task_component'
import {connect} from 'react-redux'
import {getTasks} from '../actions/get_tasks'


class DashboardTasks extends Component {
  componentWillMount(){
    this.props.getTasks();
  }
  render(){
    return (
      <ul className="list-group">
        <TaskComponent title="Regular Tasks" tasks={this.props.tasks.regular} />
        <TaskComponent title="Recurring Tasks" tasks={this.props.tasks.recurring} />
        <TaskComponent title="Major Tasks" tasks={this.props.tasks.major} />
      </ul>
    )
  }
}

function mapStateToProps(state){
  return {tasks:state.tasks}
}

export default connect(mapStateToProps, {getTasks})(DashboardTasks)
