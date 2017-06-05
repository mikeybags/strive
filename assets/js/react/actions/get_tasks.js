import axios from 'axios';
import {GET_TASKS} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getTasks(props){
  const request = axios.get('/task')
  return {
    type:GET_TASKS,
    payload:request
  };
}
