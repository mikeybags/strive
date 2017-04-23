import React, {Component} from 'react'
import _ from 'lodash'

class TasksView extends Component {
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
        <tr key={task.id} onClick={typeof this.props.edit === "function" ? () => {this.props.edit(task)} : ""}>
          {renderRowData(task, this.props.show)}
          <td>Y/N</td>
        </tr>
      )
    })
  }
  render(){
    return (
      <table className="table table-bordered table-striped">
      <thead>
        <tr>
          {this.renderHeaders()}
          <td>Completed</td>
        </tr>
      </thead>
      <tbody>
        {this.renderBody()}
      </tbody>
      </table>
    )
  }
}

export default TasksView
