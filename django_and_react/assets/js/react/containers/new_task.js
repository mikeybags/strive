import React, {Component, PropTypes} from 'react';
import _ from 'lodash'
import {reduxForm} from 'redux-form';
import {createTask} from '../actions/create_task'
import {Link} from 'react-router';
import {connect} from 'react-redux'
import Moment from 'moment'

class TasksNew extends Component {
  constructor(props){
    super(props);

    this.state = {
      errors:[],
      name:"",
      description:"",
      weight:"easy",
      start_date:Moment().format('YYYY-MM-DD'),
      end_date:Moment().format('YYYY-MM-DD'),
      task_type:"regular"
    }
  }
  static contextTypes = {
    router:PropTypes.object
  };
  handleSubmit(event) {
    event.preventDefault()
    this.props.createTask(this.state)
      .then((actionObject) => {
        const data = actionObject.payload.data;
        if (data.hasOwnProperty('errors')){
          this.setState({errors: data.errors});
        }
        else{
          console.log(data);
          this.context.router.push('profile')
        }
      });
  }
  renderErrors(){
    return this.state.errors.map((error) => {
      return (<li key={error}>{error}</li>)
    })
  }
  handleInputChange(key, event){
    var stateObj = this.state;
    stateObj[key] = event.target.value
    this.setState(stateObj)
  }
  handleTaskTypeChange(event){
    this.setState({type:event.target.value})
  }
  render() {
    return (
      <div>
        <h3>Add a Task</h3>
        <ul>
          {this.renderErrors()}
        </ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset className="form-group">
          <legend>Radio buttons</legend>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="task_type"  value="regular"  checked={this.state.task_type === 'regular'} onChange={this.handleTaskTypeChange.bind(this)} />
               Regular Task
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="task_type"  value="recurring"  checked={this.state.task_type === 'recurring'} onChange={this.handleTaskTypeChange.bind(this)} />
               Recurring Task
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="task_type" value="major"  checked={this.state.task_type === 'major'} onChange={this.handleTaskTypeChange.bind(this)} />
               Major Task
            </label>
          </div>
        </fieldset>
        <div className="form-group">
          <label>Task Name</label>
          <input type="text" className="form-control" value={this.state.name} onChange={this.handleInputChange.bind(this, 'name')} />
        </div>
        <div className="form-group">
          <label>Task Description</label>
          <input type="text" className="form-control" value={this.state.description} onChange={this.handleInputChange.bind(this, 'description')} />
        </div>
        <div className="form-group">
          <label>Task Difficulty</label>
          <select className="form-control" value={this.state.weight} onChange={this.handleInputChange.bind(this, 'weight')}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" className="form-control" value={this.state.start_date} onChange={this.handleInputChange.bind(this, 'start_date')} />
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input type="date" className="form-control" value={this.state.end_date} onChange={this.handleInputChange.bind(this, 'end_date')} />

        </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {createTask})(TasksNew)
