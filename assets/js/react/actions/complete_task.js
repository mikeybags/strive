import axios from 'axios';
import {COMPLETE_TASK} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function completeTask(props){
  props.end_date = props.unformatted_end_date;
  props.start_date = props.unformatted_start_date;
  const request = axios.patch('/task', props)
  return {
    type:COMPLETE_TASK,
    payload:request
  };
}
