import {GET_PURCHASES} from '../actions/types'

export default function(state = [], action){
  switch(action.type){
    case GET_PURCHASES:
      const purchases = action.payload.data.purchases
      return purchases
      break;
    default:
      return state;
      break;
  }
}
