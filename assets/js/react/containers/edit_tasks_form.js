import React, {Component, PropTypes} from 'react';
import _ from 'lodash'
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Moment from 'moment'
import {editTask} from '../actions/edit_task'
import {getTasks} from '../actions/get_tasks'

class TasksEditForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      errors:[],
      id:"",
      name:"",
      description:"",
      weight:"easy",
      start_date:"",
      end_date:"",
      task_type:"",
      public:false
    }
  }
  static contextTypes = {
    router:PropTypes.object
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.editTask(this.state).then((actionObject) => {
      const data = actionObject.payload.data;
      if (data.hasOwnProperty('errors')){
        this.setState({errors: data.errors});
      }
      else {
        this.props.getTasks();
        this.setState({
          errors:[],
          id:"",
          name:"",
          description:"",
          weight:"easy",
          start_date:"",
          end_date:"",
          task_type:"",
          public:false
        })
      }
    })
  }
  componentWillReceiveProps(nextProps){
    const task = nextProps.task
    switch(task.points){
      case 6:
        task.weight = "medium";
        break;
      case 10:
        task.weight = "medium";
        break;
      case 12:
        task.weight = "difficult";
        break;
      case 20:
        task.weight = "difficult";
        break;
      default:
        task.weight = "easy";
        break;
    }
    this.setState({id:task.id, name:task.name, description:task.description, weight:task.weight, start_date:Moment(task.unformatted_start_date).format('YYYY-MM-DD'), end_date:Moment(task.unformatted_end_date).format('YYYY-MM-DD'), task_type:task.task_type, public:task.public})
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
    this.setState({task_type:event.target.value})
  }
  handlePublicChange(event){
    let bool = false
    if (event.target.value === "true"){
      bool = true
    }
    this.setState({public:bool})
  }
  render() {
    return (
      <div>
        <h3>Click a Task to Edit</h3>
        <ul>
          {this.renderErrors()}
        </ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset className="form-group row">
          <div className="form-check form-check-inline col-sm-4">
            <label >
              <input type="radio" className="form-check-input" name="task_type"  value="regular"  checked={this.state.task_type === 'regular'} onChange={this.handleTaskTypeChange.bind(this)} /> Regular Task
            </label>
          </div>
          <div className="form-check form-check-inline col-sm-4">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="task_type"  value="recurring"  checked={this.state.task_type === 'recurring'} onChange={this.handleTaskTypeChange.bind(this)} /> Recurring Task
            </label>
          </div>
          <div className="form-check form-check-inline col-sm-4">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="task_type" value="major"  checked={this.state.task_type === 'major'} onChange={this.handleTaskTypeChange.bind(this)} /> Major Task
            </label>
          </div>
        </fieldset>
        <div className="form-group">
          <label>Task Name</label>
          <input type="text" className="form-control" value={this.state.name} onChange={this.handleInputChange.bind(this, 'name')} />
        </div>
        {this.state.task_type != "major" &&
          <div className="form-group">
            <label>Task Difficulty</label>
            <select className="form-control" value={this.state.weight} onChange={this.handleInputChange.bind(this, 'weight')}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>
        }
        <div className="form-group">
          <label>Task Description</label>
          <input type="text" className="form-control" value={this.state.description} onChange={this.handleInputChange.bind(this, 'description')} />
        </div>
        <fieldset className="form-group row">
          <div className="form-check form-check-inline col-sm-6">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="public"  value={false}  checked={this.state.public === false} onChange={this.handlePublicChange.bind(this)} /> Private Task
            </label>
          </div>
          <div className="form-check form-check-inline col-sm-6">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="public" value={true}  checked={this.state.public === true} onChange={this.handlePublicChange.bind(this)} /> Public Task
            </label>
          </div>
        </fieldset>
        {this.state.task_type != "recurring" &&
          <div className="row">
            <div className="form-group col-sm-6">
              <label>Start Date</label>
              <input type="date" className="form-control" value={this.state.start_date} onChange={this.handleInputChange.bind(this, 'start_date')} />
            </div>
            <div className="form-group col-sm-6">
              <label>Due Date</label>
              <input type="date" className="form-control" value={this.state.end_date} onChange={this.handleInputChange.bind(this, 'end_date')} />
            </div>
          </div>
        }
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {editTask, getTasks})(TasksEditForm)
