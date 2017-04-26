import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_FRIENDS} from './types'

export function getFriends(props){
  const request = axios.get('/friends')
  return {
    type:GET_FRIENDS,
    payload:request
  }
}
