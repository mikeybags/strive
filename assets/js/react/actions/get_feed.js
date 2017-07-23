import axios from 'axios';
import { GET_FEED } from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getFeed(props){
  const request = axios.get('/activity_feed')
  return {
    type: GET_FEED,
    payload: request
  };
}
