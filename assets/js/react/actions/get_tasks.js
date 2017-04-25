import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_TASKS} from './types'


export function getTasks(props){
  const request = axios.get('/task')
  return {
    type:GET_TASKS,
    payload:request
  }
}
