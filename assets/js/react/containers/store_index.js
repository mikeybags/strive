import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItems} from '../actions/get_items'
import {createPurchase} from '../actions/create_purchase'
import {getPoints} from '../actions/get_points'
import { setCookie } from 'redux-cookie';

class StoreIndex extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: {},
      filter_category:"All",
      notification:""
    }
  }
  componentWillMount(){
    this.props.getItems()
  }
  changePicture(selected){
    this.setState({selected})
  }
  renderItems(){
    const items = this.props.items
    return items.map((item) => {
      if (item.category === this.state.filter_category || this.state.filter_category === "All")
      return (
        <div key={item.picture} className={`store-option ${this.state.selected.picture === item.picture ? 'picture-option-selected' : ''}`} onClick={this.changePicture.bind(this, item)}>
          <img src={`static/images/${item.picture}`} className="img-responsive store-picture-option" />
          <p className="text-center">{item.name}</p>
          <p className="text-center">{item.price} points</p>
        </div>
      )
    })
  }
  addCategories(){
    return this.props.categories.map((category) => {
      return <option key={category} value={category}>{category}</option>
    })
  }
  onFilterChange(event){
    this.setState({filter_category:event.target.value, selected:{}})
  }
  onBuyClick(){
    if (this.state.selected.price > this.props.points.open_balance) {
      this.setState({notification:"You are too poor. Strive Harder"})
    }
    else if (this.state.selected  === {}) {
      this.setState({notification:"No Picture Selected"})
    } else {
      this.props.createPurchase({item_id:this.state.selected.id}).then((data) => {
        const new_photo = data.payload.data.Success;
        this.props.setCookie("picture", new_photo, {expires:7});
        this.setState({notification:"Purchase Successful"});
        this.props.getItems();
        this.props.getPoints();

      })

    }
  }
  render(){
    return (
      <div>
        <div>
          <p>{this.state.notification}</p>
          <p>Open Balance: {this.props.points.open_balance}</p>
          <h5>Filter</h5>
          <select onChange={this.onFilterChange.bind(this)}>
            <option value="All">All</option>
            {this.addCategories()}
          </select>

        </div>
        {this.renderItems()}
        <button onClick={this.onBuyClick.bind(this)}>Buy!</button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {items: state.store_items, categories:state.categories, points:state.points}
}

export default connect(mapStateToProps, {getItems, createPurchase, setCookie, getPoints})(StoreIndex)
