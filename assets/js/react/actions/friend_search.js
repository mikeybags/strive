import axios from 'axios';
import { FRIEND_SEARCH } from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function friendSearch(props) {
  const request = axios.get('/friend_search', { params: {props}});
  return {
    type: FRIEND_SEARCH,
    payload: request
  };
}
