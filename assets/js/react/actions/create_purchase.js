import axios from 'axios';
import {CREATE_PURCHASE} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function createPurchase(props){
  const request = axios.post(`/store`, props)
  return {
    type:CREATE_PURCHASE,
    payload:request
  };
}
