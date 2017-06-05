import axios from 'axios';
import { GET_FEED } from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getActivity(props){
  const request = axios.get('react/activity_feed')
  return {
    type: GET_FEED,
    payload: request
  };
}
