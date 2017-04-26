import { FRIEND_SEARCH } from '../actions/types'

export default function(state = [], action) {
  switch(action.type) {
    case FRIEND_SEARCH:
      console.log("reducer!")
      const users = action.payload.data.users
      console.log(users)
      return users;
    default:
      return state;
  }
}
