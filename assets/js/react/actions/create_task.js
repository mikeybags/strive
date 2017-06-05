import axios from 'axios';
import Moment from 'moment';
import {CREATE_TASK} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function createTask(props){
  if (props.task_type != "major"){
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
  } else {
    const start = Moment(props.start_date)
    const end = Moment(props.end_date)
    props.points = 15 * end.diff(start, 'days')
  }

  const request = axios.post('/task', props)

  return {
    type:CREATE_TASK,
    payload:request
  };
}
