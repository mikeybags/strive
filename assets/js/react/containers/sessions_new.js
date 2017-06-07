import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createSession} from '../actions/create_session';
import {login} from '../actions/login';
import {getPoints} from '../actions/get_points';
import {Link} from 'react-router';
import { setCookie, getCookie } from 'redux-cookie';

class SessionsNew extends Component {
  constructor(props){
    super(props);

    this.state = {
      errors:[]
    }
  }
  componentWillMount() {
    if (this.props.getCookie("id") !== 'undefined'){
      this.context.router.push('home')
    }
  }
  static contextTypes = {
    router:PropTypes.object
  };
  onSubmit(props) {
    this.props.login(props)
      .then((actionObject) => {
        const data = actionObject.payload.data;
        if (data.hasOwnProperty('errors')){
          this.setState({errors: data.errors});
        }
        else{
          this.props.setCookie("id", data.id, {expires:7})
          this.props.setCookie("name", data.first_name, {expires:7})
          this.props.setCookie("picture", data.picture, {expires:7})
          this.props.createSession(data)
          this.props.getPoints()
          this.context.router.push('home')
        }
      });
  }
  renderErrors(){
    return this.state.errors.map((error) => {
      return (<li key={error}>{error}</li>)
    })
  }
  render() {
      const { fields: {email, password}, handleSubmit } = this.props;
    return (
      <div>
        <h3>Login</h3>
        <ul>
          {this.renderErrors()}
        </ul>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
          <Link to='/register'>Not Registered? Register</Link>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  if (!values.email) {
    errors.email = "Enter an email"
  }
  if (!values.password) {
    errors.password = "Enter a password"
  }
  return errors;
}

export default reduxForm({
  form: 'SessionsNewForm',
  fields: ['email', 'password'],
  validate
},null, {createSession, login, setCookie, getPoints, getCookie})(SessionsNew)
