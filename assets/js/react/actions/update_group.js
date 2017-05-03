import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";
import { UPDATE_GROUP } from './types';

export function updateGroup(props) {
  const request = axios.put('/add_member', props);
  return {
    type: UPDATE_GROUP,
    payload: request
  };
}
