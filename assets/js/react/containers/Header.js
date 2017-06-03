import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {deleteSession} from '../actions/delete_session';
import {createSession} from '../actions/create_session';
import {getSession} from '../actions/get_session';
import {Link} from 'react-router';
import { getCookie, expireCookie } from 'redux-cookie';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, FormGroup, FormControl, Button, NavLink } from 'react-bootstrap';
import {getPoints} from '../actions/get_points';
import SearchBar from '../components/search_bar';


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
        this.props.getPoints()
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
              <li className="nav-buttons" role="presentation"><a href='#/register'>Register</a></li>
              <li className="nav-buttons" role="presentation"><a href='#/'>Log In</a></li>
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
          <a id="brand" className="navbar-brand" href="#/home">Strive</a>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <SearchBar />
          </Navbar.Form>
            <Nav pullRight>
              <NavDropdown className="name-dropdown" noCaret eventKey={3} title={session.name} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} href="#/profile/0" className="nav-dropdown-links">View Profile</MenuItem>
                <MenuItem eventKey={3.2} className="nav-dropdown-links">More Stuff</MenuItem>
                <MenuItem eventKey={3.3} className="nav-dropdown-links">Even More Stuff</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3} className="nav-dropdown-links">Separated Stuff</MenuItem>
              </NavDropdown>
              <li className="nav-buttons" role="presentation"><a href='#/store'>Store</a></li>
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

export default connect(mapStateToProps, {deleteSession, getSession, createSession, getCookie, expireCookie, getPoints})(Header);
