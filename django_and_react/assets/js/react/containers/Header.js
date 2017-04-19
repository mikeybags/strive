import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {deleteSession, createSession, getSession} from '../actions/index'
import {Link} from 'react-router'

class Header extends Component {
  static contextTypes = {
    router:PropTypes.object
  };
  onLogout(){
    this.props.deleteSession(this.props.session.id)
    this.context.router.push('/')
  }
  componentWillMount(){
    this.props.getSession()
      .then((actionObject) => {
        const data = actionObject.payload.data;
        if (data.hasOwnProperty("id")){
          this.props.createSession(data)
        }
      });
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

export default connect(mapStateToProps, {deleteSession, getSession, createSession})(Header);
