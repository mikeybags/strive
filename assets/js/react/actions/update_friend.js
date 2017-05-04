import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN"
import { UPDATE_FRIEND } from './types';

export function updateFriend(props) {
  const request = axios.put('/request_friend', props);
  return {
    type: UPDATE_FRIEND,
    payload: request
  };
}
