import React from 'react';

const UserListItem = ({user}) => {
  // const video = props.video and const onVideoSelect = props.onVideoSelect; by changing the argument in VideoListItem to {video} instead of props, we don't have to use this line.
  //const imageUrl = video.snippet.thumbnails.default.url;

  return (
    <li className="list-group-item">
      <div className="media-body">
        <div className="media-heading">{user.first_name}</div>
      </div>
    </li>
  );
};

export default UserListItem
