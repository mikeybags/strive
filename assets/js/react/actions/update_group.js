import axios from 'axios';
import { UPDATE_GROUP } from './types';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export function updateGroup(props) {
  const request = axios.put('/add_member', props);
  return {
    type: UPDATE_GROUP,
    payload: request
  };
}
