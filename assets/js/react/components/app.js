import React, { Component, PropTypes } from 'react';
import Header from '../containers/header';
import { connect } from 'react-redux';
import { getCookie } from 'redux-cookie';

class App extends Component {
  static contextTypes = {
    router:PropTypes.object
  };
  componentWillUpdate() {
    if (!this.props.session.hasOwnProperty("id") && this.props.getCookie("id") === 'undefined'){
      const address = location.hash.substr(0, location.hash.indexOf('?'));
     if (address !== '#/' && address !== '#/register') {
      console.log("hello!!");
      this.context.router.push('/')
      }
    }
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {session:state.session}
}

export default connect(mapStateToProps, { getCookie })(App);
