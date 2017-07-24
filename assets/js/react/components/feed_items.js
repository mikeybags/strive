import React, { Component } from 'react';

class FeedItems extends Component {
	constructor(props) {
		super(props);
	}

	renderFeedItems() {
		if (this.props.activities.length > 0) {
			return this.props.activities.map((activity) => {
				return (
					<li className="request-list feed-item list-group-item" key={activity.id}>
						<p className="feed-timestamp">{activity.created_at}</p>
						<div className="feed-content">
							<img className="feed-picture" src={`static/images/${activity.user__profile_picture}`} />
							<p className="feed-message">{activity.message}</p>
						</div>
					</li>
				);
			});
		}
		else {
				return (
					<li className="request-list list-group-item">
						Your Feed Is empty. Come back for more soon!
					</li>
				);
		}
	}

	render() {
		return (
			<ul className="list-group">
				<h4 className="text-center">Recent Activity</h4>
				{this.renderFeedItems()}
			</ul>
		);
	}
}

export default FeedItems;