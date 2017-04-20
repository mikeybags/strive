import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
import {CREATE_USER} from './types'

export function createUser(props){
  const request = axios.post('/users/create', props)
  return {
    type:CREATE_USER,
    payload:request
  }
}
