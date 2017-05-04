import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_TASK_STATS} from './types'


export function getTaskStats(props){
  const request = axios.get(`/task_graph/${props}`)
  return {
    type:GET_TASK_STATS,
    payload:request
  }
}
