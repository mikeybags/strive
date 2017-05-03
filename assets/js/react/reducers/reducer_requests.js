import { GET_REQUESTS } from '../actions/types'

export default function(state = { group:[], friend:[] }, action) {
  switch(action.type) {
    case GET_REQUESTS:
      const group = [],
            friend = [];
      const friend_requests = action.payload.data.friend_requests;
      const group_requests = action.payload.data.group_requests;
      friend_requests.map((friend_request) => {
        friend_request.message = `You have received a friend request from ${friend_request.user__username} (${friend_request.user__first_name} ${friend_request.user__last_name}).`
        friend.push(friend_request);
      });
      group_requests.map((group_request) => {
        group_request.message = `You have been invited to join the "${group_request.group__name}" group challenge by ${group_request.group__task__user__username}.`
        group.push(group_request);
      })
      return { friend, group }
    default:
      return state;
  }
}
