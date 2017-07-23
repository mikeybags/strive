import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setCookie } from 'redux-cookie';
import { getPurchases } from '../actions/get_purchases';
import { addPicture } from '../actions/add_picture';

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
    this.props.getPurchases()
  }
  changePicture(selected){
    this.setState({selected})
  }
  renderPurchases(){
    const purchases = this.props.purchases
    return purchases.map((purchase) => {
      if (purchase.category === this.state.filter_category || this.state.filter_category === "All"){
        return (
          <div key={purchase.picture} className={`store-option ${this.state.selected.picture === purchase.picture ? 'picture-option-selected' : ''}`} onClick={this.changePicture.bind(this, purchase)}>
            <img src={`static/images/${purchase.picture}`} className="img-responsive store-picture-option" />
            <p className="text-center">{purchase.name}</p>
          </div>
        )
      }
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
  pictureChange(){
    const new_photo = this.state.selected.picture;
    this.props.addPicture(new_photo).then(() => {
      this.props.setCookie("picture", new_photo, {expires:7});
    })
  }
  render(){
    return (
      <div>
        <div>
          <p>{this.state.notification}</p>
          <h5>Filter</h5>
          <select onChange={this.onFilterChange.bind(this)}>
            <option value="All">All</option>
            {this.addCategories()}
          </select>
          <button onClick={this.pictureChange.bind(this)}>Change Avatar</button>
        </div>
        {this.renderPurchases()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {categories:state.categories, purchases:state.purchases}
}

export default connect(mapStateToProps, {setCookie, getPurchases, addPicture})(StoreIndex)
