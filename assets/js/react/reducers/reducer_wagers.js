import { GET_WAGERS } from '../actions/types'

export default function(state = [], action) {
  switch(action.type) {
    case GET_WAGERS:
      const wagers = action.payload.data.wagers
      return wagers;
    default:
      return state;
  }
}
