import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createUser, createSession} from '../actions/index';
import {Link} from 'react-router';
import { setCookie } from 'redux-cookie';

class UsersNew extends Component {
  constructor(props){
    super(props);

    this.state = {
      errors:[]
    }
  }
  static contextTypes = {
    router:PropTypes.object
  };

  onSubmit(props) {
    this.props.createUser(props)
      .then((actionObject) => {
        const data = actionObject.payload.data;
        if (data.hasOwnProperty('errors')){
          this.setState({errors: data.errors});
        }
        else{
          this.props.setCookie("id", data.id, {expires:7})
          this.props.setCookie("name", data.first_name, {expires:7})
          this.props.createSession(data)
          this.context.router.push('home')
        }
      });
  }
  renderErrors(){
    return this.state.errors.map((error) => {
      return (<li key={error}>{error}</li>)
    })
  }

  render(){
    const { fields: {first_name, last_name, email, password, confirm_password}, handleSubmit } = this.props;
    return(
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create a new post</h3>
          <ul>
            {this.renderErrors()}
          </ul>
          <div className={`form-group ${first_name.touched && first_name.invalid ? 'has-danger' : ''}`}>
            <label>First Name</label>
            <input type="text" className="form-control" {...first_name} />
            <div className="text-help">
              {first_name.touched ? first_name.error : ""}
            </div>
          </div>
          <div className={`form-group ${last_name.touched && last_name.invalid ? 'has-danger' : ''}`}>
            <label>Last Name</label>
            <input type="text" className="form-control" {...last_name} />
            <div className="text-help">
              {last_name.touched ? last_name.error : ""}
            </div>
          </div>
          <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
            <label>Email</label>
            <input type="text" className="form-control" {...email} />
            <div className="text-help">
              {email.touched ? email.error : ""}
            </div>
          </div>
          <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
            <label>Password</label>
            <input type="password" className="form-control" {...password} />
            <div className="text-help">
              {password.touched ? password.error : ""}
            </div>
          </div>
          <div className={`form-group ${confirm_password.touched && confirm_password.invalid ? 'has-danger' : ''}`}>
            <label>Confirm Password</label>
            <input type="password" className="form-control" {...confirm_password} />
            <div className="text-help">
              {confirm_password.touched ? confirm_password.error : ""}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to='/login'>Already Registered? Login</Link>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "Enter a First Name"
  }
  if (!values.last_name) {
    errors.last_name = "Enter a Last Name"
  }
  if (!values.email) {
    errors.email = "Enter an email"
  }
  if (!values.password) {
    errors.password = "Enter a password"
  }
  if (!values.confirm_password) {
    errors.confirm_password = "Enter password confirmation"
  }
  return errors;
}

export default reduxForm({
  form: 'UsersNewForm',
  fields: ['first_name', 'last_name', 'email', 'password', 'confirm_password'],
  validate
},null, {createUser, createSession, setCookie})(UsersNew)
