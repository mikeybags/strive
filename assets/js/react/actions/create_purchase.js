import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {CREATE_PURCHASE} from './types'

export function createPurchase(props){
  const request = axios.post(`/store`, props)
  return {
    type:CREATE_PURCHASE,
    payload:request
  }
}
