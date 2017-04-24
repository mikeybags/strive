import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {ADD_PICTURE} from './types'

export function addPicture(props){
  const request = axios.post(`/users/picture`, {picture:props})
  return {
    type:ADD_PICTURE,
    payload:request
  }
}
