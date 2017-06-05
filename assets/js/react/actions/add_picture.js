import axios from 'axios';
import {ADD_PICTURE} from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function addPicture(props){
  const request = axios.post(`/users/picture`, {picture:props})
  return {
    type:ADD_PICTURE,
    payload:request
  };
}
