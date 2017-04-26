import React, {Component} from 'react'


class NotificationList extends Component {
  renderNotifications(){
    if (this.props.notifications) {
      this.props.notifications.map((notification) => {
        <li className="list-group-item">
          <p className="text-center">{notification.message}</p>
          <div className="row">
            <div className="col-xs-6">
              <button onClick={() => {this.props.acceptClick(notification, this.props.type)}} type="button" className="btn btn-primary">Accept</button>
            </div>
            <div className="col-xs-6">
              <button onClick={() => {this.props.denyClick(notification, this.props.type)}} type="button" className="btn btn-default">Deny</button>
            </div>
          </div>
        </li>
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

export default NotificationList
