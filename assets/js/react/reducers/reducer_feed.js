import { GET_FEED } from '../actions/types';

export default function( state = {}, action ) {
  switch (action.type) {
    case GET_FEED:
      const activities = action.payload.data.activities;
      return [ action.payload.data, ...state];
    default:
      return state;
  }
}
