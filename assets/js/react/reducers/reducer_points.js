import {GET_POINTS, GET_TASKS} from '../actions/types'
import Moment from 'moment'

export default function(state = {open_balance:0, wager_balance:0, spent:0, daily_potential:[]}, action){
  switch(action.type){
    case GET_POINTS:
      const points_data = action.payload.data
      return {
        open_balance:points_data.open_balance,
        wager_balance:points_data.wager_balance,
        spent:points_data.spent,
        daily_potential:state.daily_potential
      };
      break;
    case GET_TASKS:
      const tasks = action.payload.data.tasks
      let potential = 0,
      finished = 0;
      tasks.map((task) => {
        if (task.task_type != 'major'){
          if (Moment(task.unformatted_start_date).isSameOrBefore(Moment(), "day") && task.completed === false){
            potential += Number(task.points);
          }
          if (Moment(task.unformatted_start_date).isSameOrBefore(Moment(), "day") && task.completed === true && Moment(task.updated_at).isSame(Moment(), "day")){
            finished += task.points;
            potential += Number(task.points);
          }
        }
      })
      return {
        open_balance:state.open_balance,
        wager_balance:state.wager_balance,
        spent:state.spent,
        daily_potential:[finished, potential]
      };
      break;
    default:
      return state;
      break;
  }
}
