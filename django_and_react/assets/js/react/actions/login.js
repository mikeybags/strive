import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {LOGIN} from './types'

export function login(props){
  const request = axios.post('users/login', props)
  return {
    type:LOGIN,
    payload:request
  }
}
