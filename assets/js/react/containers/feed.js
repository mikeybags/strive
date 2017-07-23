import React, {Component} from 'react';
import ReactingComponent from '../components/reactions';
import MyEmojiInput from '../components/emoji_picker';
import FeedItems from '../components/feed_items';
import { connect } from 'react-redux';
import { getFeed } from '../actions/get_feed';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getFeed().then((data) => {});
  }

  render(){
    return (
      <div>
        <FeedItems activities={this.props.activities}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {activities: state.activities};
}

export default connect(mapStateToProps, { getFeed })(Feed);
