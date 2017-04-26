import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import SessionsReducer from './reducer_sessions'
import TasksReducer from './reducer_tasks'
import PointsReducer from './reducer_points'
import StoreItemsReducer from './reducer_store_items'
import CategoryReducer from './reducer_categories'
import PurchaseReducer from './reducer_purchases'


const rootReducer = combineReducers({
  form:formReducer,
  session:SessionsReducer,
  tasks:TasksReducer,
  points:PointsReducer,
  store_items:StoreItemsReducer,
  categories:CategoryReducer,
  purchases:PurchaseReducer
});

export default rootReducer;
