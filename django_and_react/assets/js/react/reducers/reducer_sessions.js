import {CREATE_SESSION, DELETE_SESSION} from '../actions/types'

export default function(state = {}, action){
  switch(action.type){
    case CREATE_SESSION:
      const user = action.payload
      return {
        id:user.id,
        name:user.first_name
      }
      break;
    case DELETE_SESSION:
      return {};
      break;
    default:
      return state;
      break;
  }
}
