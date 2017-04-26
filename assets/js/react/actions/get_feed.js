import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

import { GET_FEED } from './types'

export function getActivity(props){
  const request = axios.get('react/activity_feed')
  return {
    type: GET_FEED,
    payload: request
  }
}
