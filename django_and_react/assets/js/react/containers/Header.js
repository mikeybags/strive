import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {deleteSession} from '../actions/delete_session'
import {createSession} from '../actions/create_session'
import {getSession} from '../actions/get_session'
import {Link} from 'react-router'
import { getCookie, expireCookie } from 'redux-cookie';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, FormGroup, FormControl, Button, NavLink } from 'react-bootstrap'


class Header extends Component {
  static contextTypes = {
    router:PropTypes.object
  };
  onLogout(){
    this.props.expireCookie("id")
    this.props.expireCookie("name")
    this.props.deleteSession(this.props.session.id)
    this.context.router.push('/')
  }
  componentWillMount(){
    if (!this.props.session.hasOwnProperty("id")){
      const id = this.props.getCookie("id");
      const first_name = this.props.getCookie("name");
      if (id !== "undefined"){
        this.props.createSession({id, first_name})
      }
    }

  }
  render(){
    const session = this.props.session
    if (!session.hasOwnProperty("id")){
      const navbarInstance = (
        <Navbar className="navbar navbar-inverse navbar-toggleable-md" id="navbar" fixedTop inverse collapseOnSelect>
          <Navbar.Header>
          <a className="navbar-brand" href="#">Strive</a>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <li className="nav-buttons" role="presentation"><a href='#/'>Register</a></li>
              <li className="nav-buttons" role="presentation"><a href='#/login'>Log In</a></li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );

      return (navbarInstance);
    }
    else{
      const navbarInstance = (
        <Navbar className="navbar navbar-inverse navbar-toggleable-md" id="navbar" fixedTop inverse collapseOnSelect>
          <Navbar.Header>
          <a className="navbar-brand" href="#">Strive</a>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup id="nav-form" className="form-inline">
              <FormControl id="nav-search" className="form-control mr-sm-2" type="text" placeholder="Search for Friends" />
              <Button id="nav-submit" className="form-control mr-sm-2" type="submit">Submit</Button>
            </FormGroup>
          </Navbar.Form>
            <Nav pullRight>
              <NavDropdown className="name-dropdown" noCaret eventKey={3} title={session.name} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Stuff</MenuItem>
                <MenuItem eventKey={3.2}>More Stuff</MenuItem>
                <MenuItem eventKey={3.3}>Even More Stuff else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated Stuff</MenuItem>
              </NavDropdown>
              <NavItem className="nav-buttons">Store</NavItem>
              <NavItem className="nav-buttons" onClick={this.onLogout.bind(this)}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );

      return (navbarInstance);
    }
  }
}

function mapStateToProps(state){
  return {session:state.session}
}

export default connect(mapStateToProps, {deleteSession, getSession, createSession, getCookie, expireCookie})(Header);
