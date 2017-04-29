import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
import { UPDATE_WAGER } from './types'

export function updateWager(props) {
  const request = axios.put('/wagers', props);
  return {
    type: UPDATE_WAGER,
    payload: request
  };
}
