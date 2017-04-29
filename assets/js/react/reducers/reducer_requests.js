import { GET_REQUESTS } from '../actions/types'

export default function(state = { group:[], wager:[], friend:[] }, action) {
  switch(action.type) {
    case GET_REQUESTS:
      const group = [],
            wager = [],
            friend = [];
      const friend_requests = action.payload.data.friend_requests;
      const wager_requests = action.payload.data.wager_requests;
      const group_requests = action.payload.data.group_requests;
      friend_requests.map((friend_request) => {
        friend_request.message = friend_request.user__username + " (" + friend_request.user__first_name + " " + friend_request.user__last_name + ") wants to be your friend.";
        friend.push(friend_request);
      });
      wager_requests.map((wager_request) => {
        wager_request.message = wager_request.wagerer + " wagers " + wager_request.points + " points against you finishing " + wager_request.task__name + " on time.";
        wager.push(wager_request);
      })
      group_requests.map((group_request) => {
        group_request.message =  group_request.group__task__user__username + " invites you to join the " + group_request.group__name + " group challenge.";
        group.push(group_request);
      })
      return { friend, wager, group }
    default:
      return state;
  }
}
