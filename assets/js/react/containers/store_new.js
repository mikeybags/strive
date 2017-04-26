import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux';
import Moment from 'moment'
import {createStoreItem} from '../actions/create_store_item'

class StoreNew extends Component {
  constructor(props){
    super(props);

    this.state = {
      name:"",
      picture:"",
      price:0,
      category:this.props.categories[0],
      categories: this.props.categories
    }
  }
  static contextTypes = {
    router:PropTypes.object
  }
  addCategories(){
    return this.state.categories.map((category) => {
      return <option key={category} value={category}>{category}</option>
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.createStoreItem(this.state).then((data) => {
      this.setState({
        name:"",
        picture:"",
        price:0,
        category:"Animals"
      })
    })
  }
  renderErrors(){
    return this.state.errors.map((error) => {
      return (<li key={error}>{error}</li>)
    })
  }
  handleInputChange(key, event){
    var stateObj = this.state;
    stateObj[key] = event.target.value
    this.setState(stateObj)
  }
  render(){
    return (
      <div>
        <h3>Add a Store Picture</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={this.state.name} onChange={this.handleInputChange.bind(this, 'name')} />
        </div>
        <div className="form-group">
          <label>Picture</label>
          <input type="text" className="form-control" value={this.state.picture} onChange={this.handleInputChange.bind(this, 'picture')} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" className="form-control" value={this.state.price} onChange={this.handleInputChange.bind(this, 'price')} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select className="form-control" value={this.state.category} onChange={this.handleInputChange.bind(this, 'category')}>
            {this.addCategories()}
          </select>
        </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {categories:state.categories}
}

export default connect(mapStateToProps, {createStoreItem})(StoreNew)
