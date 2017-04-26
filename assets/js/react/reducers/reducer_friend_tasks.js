import {GET_FRIEND_TASKS} from '../actions/types'

export default function(state = [], action){
  switch(action.type){
    case GET_FRIEND_TASKS:
      const friend_tasks = action.payload.data.friend_tasks
      return friend_tasks
      break;
    default:
      return state;
      break;
  }
}
