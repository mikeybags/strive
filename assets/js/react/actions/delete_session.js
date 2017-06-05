import axios from 'axios';
import {DELETE_SESSION} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function deleteSession(props){
  const request = axios.get('users/logout')
  return {
    type:DELETE_SESSION,
    payload:request
  };
}
