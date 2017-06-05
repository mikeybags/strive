import axios from 'axios';
import {CREATE_USER} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function createUser(props){
  const request = axios.post('/users/create', props)
  return {
    type:CREATE_USER,
    payload:request
  };
}
