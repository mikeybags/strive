import axios from 'axios';
import { UPDATE_WAGER } from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function updateWager(props) {
  const request = axios.put('/wagers', props);
  return {
    type: UPDATE_WAGER,
    payload: request
  };
}
