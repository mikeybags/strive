import axios from 'axios';
import { UPDATE_FRIEND } from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN"

export function updateFriend(props) {
  const request = axios.put('/request_friend', props);
  return {
    type: UPDATE_FRIEND,
    payload: request
  };
}
