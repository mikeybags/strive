import axios from 'axios';
import {CREATE_WAGER} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function createWager(props){
  const request = axios.post('/wagers', props)
  return {
    type:CREATE_WAGER,
    payload:request
  }
};
