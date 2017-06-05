import {CREATE_SESSION} from './types';

export function createSession(props){
  return {
    type:CREATE_SESSION,
    payload:props
  };
}
