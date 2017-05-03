import React, {Component} from 'react'

class WagersList extends Component {
  renderListItems(){
    return this.props.wagers.map((wager) => {
      return (
        <li key={wager.message + Math.random()} className="list-group-item">
          <p>{wager.message}</p>
        </li>
      )
    })
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
