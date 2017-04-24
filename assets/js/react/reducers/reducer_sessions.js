import {CREATE_SESSION, DELETE_SESSION, ADD_PICTURE} from '../actions/types'

export default function(state = {}, action){
  switch(action.type){
    case CREATE_SESSION:
      const user = action.payload
      return {
        id:user.id,
        name:user.first_name,
        picture:user.picture
      }
      break;
    case DELETE_SESSION:
      return {};
      break;
    case ADD_PICTURE:
      return {
        id:state.id,
        name:state.name,
        picture:action.payload.data.picture
      }
    default:
      return state;
      break;
  }
}
