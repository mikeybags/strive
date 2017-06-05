import axios from 'axios';
import { REQUEST_FRIEND } from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function requestFriend(props) {
  const request = axios.get('/request_friend', { params: { props }});
  return {
    type: REQUEST_FRIEND,
    payload: request
  };
}
