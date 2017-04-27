import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_WAGERS} from './types'


export function getWagers(props){
  const request = axios.get('/wagers')
  return {
    type:GET_WAGERS,
    payload:request
  }
}
