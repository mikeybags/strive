import axios from 'axios';
import {GET_FRIENDS} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getFriends(props){
  const request = axios.get('/friends')
  return {
    type:GET_FRIENDS,
    payload:request
  };
}
