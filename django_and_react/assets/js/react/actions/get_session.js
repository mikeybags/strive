import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_SESSION} from './types'


export function getSession(props){
  const request = axios.get('users/session')
  return {
    type:GET_SESSION,
    payload:request
  }
}
