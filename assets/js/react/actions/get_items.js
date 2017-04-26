import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_ITEMS} from './types'

export function getItems(props){
  const request = axios.get('/store')
  return {
    type:GET_ITEMS,
    payload:request
  }
}
