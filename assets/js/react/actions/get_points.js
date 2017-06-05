import axios from 'axios';
import {GET_POINTS} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getPoints(props){
  const request = axios.get('/points')
  return {
    type:GET_POINTS,
    payload:request
  }
}
