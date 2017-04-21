import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import SessionsReducer from './reducer_sessions'
import TasksReducer from './reducer_tasks'


const rootReducer = combineReducers({
  form:formReducer,
  session:SessionsReducer,
  tasks:TasksReducer
});

export default rootReducer;
