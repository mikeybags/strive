import axios from 'axios';
import { GET_REQUESTS } from './types';

axios.defaults.xsrfHeadername = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


export function getRequests(props) {
  const request = axios.get('/requests')
  return {
    type: GET_REQUESTS,
    payload: request
  };
}
