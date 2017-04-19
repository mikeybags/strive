import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export const CREATE_USER = 'CREATE_USER';
export const CREATE_SESSION = 'CREATE_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';
export const GET_SESSION = 'GET_SESSION';
export const LOGIN = 'LOGIN';

export function createUser(props){
  const request = axios.post('/users/create', props)
  return {
    type:CREATE_USER,
    payload:request
  }
}

export function createSession(props){
  return {
    type:CREATE_SESSION,
    payload:props
  }
}

export function deleteSession(props){
  const request = axios.get('users/logout')
  return {
    type:DELETE_SESSION,
    payload:request
  }
}

export function login(props){
  const request = axios.post('users/login', props)
  return {
    type:LOGIN,
    payload:request
  }
}
export function getSession(props){
  const request = axios.get('users/session')
  return {
    type:GET_SESSION,
    payload:request
  }
}
