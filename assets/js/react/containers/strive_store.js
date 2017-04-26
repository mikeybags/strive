import React, {Component} from 'react'
import {Link} from 'react-router'

class StriveStore extends Component {
  render(){
    return (
      <div>
        <Link to='store/new'>Admin? Add Product</Link>
        <Link to='profile/4'>View Purchases</Link>
        {this.props.children}
      </div>
    )
  }
}

export default StriveStore
