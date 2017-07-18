import React, { Component } from 'react'

class WagersList extends Component {
  renderListItems(){
    if (this.props.wagers.length > 0) {
      return this.props.wagers.map((wager) => {
        return (
          <li key={wager.message + Math.random()} className="list-group-item">
            <p>{wager.message}</p>
          </li>
        )
      });
    } else { 
      return (
        <li className="request-list list-group-item">You have no active {this.props.type} wagers.</li>
      );
    }
  }

  render(){
    return (
      <ul className="list-group">
        {this.renderListItems()}
      </ul>
    )
  }
}


export default WagersList
