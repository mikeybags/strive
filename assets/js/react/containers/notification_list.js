import React, {Component} from 'react'
import { getRequests } from '../actions/get_requests'
import { connect } from 'react-redux'


class NotificationList extends Component {
  componentWillMount() {
    this.props.getRequests();
  }

  renderNotifications(){
    if (this.props.notifications) {
      return this.props.notifications.map((notification) => {
        return ( <li className="list-group-item" key={notification.message + Math.random()}>
          <p className="text-center">{notification.message}</p>
          <div className="row">
            <div className="col-xs-6">
              <button onClick={() => {this.props.acceptClick(notification, this.props.type)}} type="button" className="btn btn-primary">Accept</button>
            </div>
            <div className="col-xs-6">
              <button onClick={() => {this.props.denyClick(notification, this.props.type)}} type="button" className="btn btn-default">Deny</button>
            </div>
          </div>
        </li> )
      })
    }
  }
  render(){
    return (
      <ul className="list-group">
        {this.renderNotifications()}
      </ul>
    )
  }
}

function mapStateToProps(state){
  return {notifications: state.requests}
}


export default connect(mapStateToProps, {getRequests})(NotificationList)
