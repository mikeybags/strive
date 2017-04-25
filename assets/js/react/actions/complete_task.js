import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
import {COMPLETE_TASK} from './types'

export function completeTask(props){
  const request = axios.patch('/task', props)
  return {
    type:COMPLETE_TASK,
    payload:request
  }
}
