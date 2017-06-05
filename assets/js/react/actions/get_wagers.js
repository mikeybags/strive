import axios from 'axios';
import {GET_WAGERS} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";



export function getWagers(props){
  const request = axios.get('/wagers')
  return {
    type:GET_WAGERS,
    payload:request
  };
}
