import React, {Component} from 'react'
import _ from 'lodash'
import {completeTask} from '../actions/complete_task'
import {getTasks} from '../actions/get_tasks'
import {getPoints} from '../actions/get_points'
import {connect} from 'react-redux'

class TasksView extends Component {

  finishTask(task, event){
    task.completed = true
    this.props.completeTask(task).then((data) => {
      this.props.getTasks()
      this.props.getPoints()
    })
  }

  renderHeaders(){
    return this.props.show.map((pair) => {
      return <th key={pair[0]}>{pair[1]}</th>
    })
  }
  renderBody(){
    function renderRowData(task, show){
      return show.map((pair) => {
        if (task[pair[0]] === true ){
          return <td key={task.id + task[pair[0]] + Math.random()} >Public</td>
        }
        else if (task[pair[0]] === false ){
          return <td key={task.id + task[pair[0]] + Math.random()} >Private</td>
        }
        else {
          return <td key={task.id + task[pair[0]] + Math.random()} >{task[pair[0]]}</td>
        }
      })
    }
    return this.props.tasks.map((task) => {
      return(
        <tr
          key={task.id}
          className={task.expired ? "expired" : ""}
          onClick={typeof this.props.edit === "function" ? () => {this.props.edit(task)} : ""}>
            {renderRowData(task, this.props.show)}
            {this.props.completeBox &&
              <td><input type="checkbox" onClick={this.finishTask.bind(this, task)} /></td>
            }
        </tr>
      )
    })
  }
  render(){
    return (
      <table className="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          {this.renderHeaders()}
          {this.props.completeBox &&
            <th>Complete</th>
          }
        </tr>
      </thead>
      <tbody>
        {this.renderBody()}
      </tbody>
      </table>
    )
  }
}

export default connect(null, {completeTask, getTasks, getPoints})(TasksView)
