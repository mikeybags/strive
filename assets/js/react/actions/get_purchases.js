import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_PURCHASES} from './types'

export function getPurchases(props){
  const request = axios.get('/purchases')
  return {
    type:GET_PURCHASES,
    payload:request
  }
}
