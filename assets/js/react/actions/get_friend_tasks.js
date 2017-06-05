import axios from 'axios';
import {GET_FRIEND_TASKS} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getFriendTasks(props){
  const request = axios.get(`/friends/tasks/${props}`)
  return {
    type:GET_FRIEND_TASKS,
    payload:request
  };
}
