import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {CREATE_TASK} from './types'

export function createTask(props){
  switch(props.weight){
    case "easy":
        props.points = 5;
      break;
    case "medium":
        props.points = 10;
      break;
    case "difficult":
        props.points = 20;
      break;
    default:
      props.points = 5;
      break;
  }
  const request = axios.post('/task', props)

  return {
    type:CREATE_TASK,
    payload:request
  }
}
