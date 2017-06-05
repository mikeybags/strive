import axios from 'axios';
import {GET_SESSION} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getSession(props){
  const request = axios.get('users/session')
  return {
    type:GET_SESSION,
    payload:request
  };
}
