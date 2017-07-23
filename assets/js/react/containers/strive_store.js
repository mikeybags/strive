import React, {Component} from 'react'
import {Link} from 'react-router'

class StriveStore extends Component {
  render(){
    return (
      <div>
        <p><Link to='store/new'>Admin? Add Product</Link></p>
        <p><Link to='profile/6'>View Purchases</Link></p>
        {this.props.children}
      </div>
    )
  }
}

export default StriveStore
