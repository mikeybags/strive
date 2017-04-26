import {GET_ITEMS} from '../actions/types'

export default function(state = [], action){
  switch(action.type){
    case GET_ITEMS:
      const store_items = action.payload.data.items
      return store_items
      break;
    default:
      return state;
      break;
  }
}
