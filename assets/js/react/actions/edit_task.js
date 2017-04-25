import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
import Moment from 'moment'

import {EDIT_TASK} from './types'

export function editTask(props){
  props.completed = false
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

  const request = axios.patch('/task', props)

  return {
    type:EDIT_TASK,
    payload:request
  }
}
