import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import SessionsReducer from './reducer_sessions'


const rootReducer = combineReducers({
  form:formReducer,
  session:SessionsReducer
});

export default rootReducer;
