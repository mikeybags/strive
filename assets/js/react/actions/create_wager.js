import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
import {CREATE_WAGER} from './types'

export function createWager(props){
  const request = axios.post('/wagers', props)
  return {
    type:CREATE_WAGER,
    payload:request
  }
}
