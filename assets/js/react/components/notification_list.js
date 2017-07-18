import React, {Component} from 'react'

class NotificationList extends Component {


  renderMessages(){
    if (this.props.message) {
      return(
        <li className="request-list list-group-item">{this.props.message}</li>
      );
    }
  }

  renderNotifications(){
    if (this.props.notifications.length > 0) {
      return this.props.notifications.map((notification) => {
        return (
          <li className="request-list list-group-item" key={notification.message + Math.random()}>
            <div className="row">
              <p className="col-sm-12 col-lg-8 request-message">{notification.message}</p>
              <div className="col-lg-2 col-xs-6 text-center">
                <button onClick={() => {this.props.acceptClick(notification, this.props.type)}} type="button" className="btn btn-primary request-btn">Accept</button>
              </div>
              <div className="col-lg-2 col-xs-6 text-center">
                <button onClick={() => {this.props.denyClick(notification, this.props.type)}} type="button" className="btn btn-danger request-btn">Deny</button>
              </div>
            </div>
          </li>
        );
      });
    } else {
      if (this.props.message) {
        return (
          <li className="request-list list-group-item">You have no more pending {this.props.type} requests.</li>
        );
      } else {
        return (
          <li className="request-list list-group-item">You have no pending {this.props.type} requests.</li>
        );
      }
    }
  }
  render(){
    return (
      <ul className="list-group">
        {this.renderMessages()}
        {this.renderNotifications()}
      </ul>
    )
  }
}


export default NotificationList
