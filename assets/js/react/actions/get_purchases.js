import axios from 'axios';
import {GET_PURCHASES} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";


export function getPurchases(props){
  const request = axios.get('/purchases')
  return {
    type:GET_PURCHASES,
    payload:request
  };
}
