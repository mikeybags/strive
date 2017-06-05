import axios from 'axios';
import {GET_TASK_STATS} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


export function getTaskStats(props){
  const request = axios.get(`/task_graph/${props}`)
  return {
    type:GET_TASK_STATS,
    payload:request
  };
}
