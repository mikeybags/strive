import axios from 'axios';
import {GET_ITEMS} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function getItems(props){
  const request = axios.get('/store')
  return {
    type:GET_ITEMS,
    payload:request
  };
}
