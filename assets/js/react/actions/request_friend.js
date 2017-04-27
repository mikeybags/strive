import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
import { REQUEST_FRIEND } from './types'

export function requestFriend(props) {
  const request = axios.get('/request_friend', { params: { props }});
  return {
    type: REQUEST_FRIEND,
    payload: request
  };
}
