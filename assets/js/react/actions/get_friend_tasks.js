import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import {GET_FRIEND_TASKS} from './types'

export function getFriendTasks(props){
  const request = axios.get(`/friends/tasks/${props}`)
  return {
    type:GET_FRIEND_TASKS,
    payload:request
  }
}
