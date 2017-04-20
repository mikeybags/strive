import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {DELETE_SESSION} from './types'

export function deleteSession(props){
  const request = axios.get('users/logout')
  return {
    type:DELETE_SESSION,
    payload:request
  }
}
