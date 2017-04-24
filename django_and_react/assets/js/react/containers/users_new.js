import React, {Component, PropTypes} from 'react';
import _ from 'lodash'
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createUser} from '../actions/create_user';
import {createSession} from '../actions/create_session';
import {Link} from 'react-router';
import { setCookie } from 'redux-cookie';

const FIELDS = {
  first_name: {
    type: 'input',
    label: 'First Name'
  },
  last_name: {
    type: 'input',
    label: 'Last Name'
  },
  email: {
    type: 'input',
    label: 'Email'
  },
  username: {
    type: 'input',
    label: 'Username'
  },
  tag_line: {
    type: 'input',
    label: 'Tag Line (optional)'
  },
  password: {
    type: 'input',
    label: 'Password'
  },
  confirm_password: {
    type: 'input',
    label: 'Confirm Password'
  }
}

// const FIELDS =  ['first_name', 'last_name', 'email', 'password', 'confirm_password'];

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
          this.props.setCookie("picture", data.picture, {expires:7})
          this.props.createSession(data)
          this.context.router.push('pictures')
        }
      });
  }
  renderErrors(){
    return this.state.errors.map((error) => {
      return (<li key={error}>{error}</li>)
    })
  }


  renderField(fieldConfig, field){
    const fieldHelper = this.props.fields[field];

    return (
      <div key={fieldConfig.label} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ""}
        </div>
      </div>
    )
  }

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Register</h3>
          <ul>
            {this.renderErrors()}
          </ul>
          {_.map(FIELDS, this.renderField.bind(this))}

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to='/login'>Already Registered? Login</Link>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  _.each(FIELDS, (type, field) => {
    if (!values[field] && field != "tag_line") {
      errors[field] = `Required Field`;
    }
  });

  return errors;
}

export default reduxForm({
  form: 'UsersNewForm',
  fields: _.keys(FIELDS),
  validate
},null, {createUser, createSession, setCookie})(UsersNew)
