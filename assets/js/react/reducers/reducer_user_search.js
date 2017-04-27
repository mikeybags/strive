import { FRIEND_SEARCH } from '../actions/types'

export default function(state = [], action) {
  switch(action.type) {
    case FRIEND_SEARCH:
      const data = action.payload.data;
      return data
    default:
      return state;
  }
}
