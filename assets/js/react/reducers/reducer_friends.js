import {GET_FRIENDS} from '../actions/types'

export default function(state = [], action){
  switch(action.type){
    case GET_FRIENDS:
      const friends = action.payload.data.friends
      return friends
      break;
    default:
      return state;
      break;
  }
}
