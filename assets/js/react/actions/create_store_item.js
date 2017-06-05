import axios from 'axios';
import {CREATE_STORE_ITEM} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function createStoreItem(props){

  const request = axios.post('/store/new', props)
  return {
    type:CREATE_STORE_ITEM,
    payload:request
  };
}
