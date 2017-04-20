import React, {Component} from 'react'
import ReactingComponent from '../components/reactions';
import MyEmojiInput from '../components/emoji_picker';

class Home extends Component {
  render(){
    return (
      <div>
        <p>Your friend got a bunch of strive points</p>
        <ReactingComponent />
        <MyEmojiInput />
      </div>
    )
  }
}

export default Home
