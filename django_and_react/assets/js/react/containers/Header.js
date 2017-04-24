import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {deleteSession} from '../actions/delete_session'
import {createSession} from '../actions/create_session'
import {getSession} from '../actions/get_session'
import {Link} from 'react-router'
import { getCookie, expireCookie } from 'redux-cookie';


class Header extends Component {
  static contextTypes = {
    router:PropTypes.object
  };
  onLogout(){
    this.props.expireCookie("id")
    this.props.expireCookie("name")
    this.props.expireCookie("picture")
    this.props.deleteSession(this.props.session.id)
    this.context.router.push('/')
  }
  componentWillMount(){
    if (!this.props.session.hasOwnProperty("id")){
      const id = this.props.getCookie("id");
      const first_name = this.props.getCookie("name");
      const picture = this.props.getCookie("picture");
      if (id !== "undefined"){
        this.props.createSession({id, first_name, picture})
      }
    }

  }
  render(){
    const session = this.props.session
    if (!session.hasOwnProperty("id")){
      return (
        <div>
          <h3>Welcome, please
            <Link to='/'> register</Link> or
            <Link to='login'> login</Link>
          </h3>
        </div>
      )
    }
    else{
      return (
        <div>
          <h3>Hello {session.name}</h3>
          <button className="btn btn-warning" onClick={this.onLogout.bind(this)}>Logout</button>
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return {session:state.session}
}

export default connect(mapStateToProps, {deleteSession, getSession, createSession, getCookie, expireCookie})(Header);
