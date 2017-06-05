import axios from 'axios';
import {LOGIN} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


export function login(props){
  const request = axios.post('users/login', props)
  return {
    type:LOGIN,
    payload:request
  };
}
