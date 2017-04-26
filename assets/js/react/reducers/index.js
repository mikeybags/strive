import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import SessionsReducer from './reducer_sessions'
import TasksReducer from './reducer_tasks'
import PointsReducer from './reducer_points'
import SearchReducer from './reducer_user_search'


const rootReducer = combineReducers({
  form:formReducer,
  session:SessionsReducer,
  tasks:TasksReducer,
  points:PointsReducer,
  search: SearchReducer
});

export default rootReducer;
