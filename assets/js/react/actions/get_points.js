import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_POINTS} from './types'

export function getPoints(props){
  const request = axios.get('/points')
  return {
    type:GET_POINTS,
    payload:request
  }
}
