import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createWager} from '../actions/create_wager'
import {getPoints} from '../actions/get_points'

class WagerForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      wager: 0,
      notification:""
    }
  }
  onInputChange(event){
    this.setState({wager:event.target.value})
  }
  onWagerClick(event){
    event.preventDefault()
    const wager = this.state.wager
    const friend = this.props.friend
    if (wager > friend.open_balance) {
      this.setState({notification:`${friend.username} is too poor`});
    }
    else if (wager > this.props.balance) {
      this.setState({notification:`You are too poor`});
    }
    else if (wager <= 0) {
      this.setState({notification:'You must wager at least 1 Strive point.'})
    }
    else {
      this.props.createWager({task:this.props.task.id, wager}).then((data) => {
        this.setState({notification:`Wager Request Sent`});
        this.props.getPoints()
        this.setState({wager:0});
      })
    }
  }
  render(){
      return (
        <form>
          <p className="text-center">Bet against {this.props.friend.username} finishing {this.props.task.name}</p>
          <div className="form-group">
            <input className="form-control" type="number" name="wager" value={this.state.wager} onChange={this.onInputChange.bind(this)} />
          </div>
          <p>{this.state.notification}</p>
          <button type="buton" className="btn btn-warning" onClick={this.onWagerClick.bind(this)}>Wager</button>
        </form>
      )
    }
}



export default connect(null, {createWager, getPoints})(WagerForm)
