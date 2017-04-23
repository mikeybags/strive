import {GET_TASKS} from '../actions/types'
import Moment from 'moment'

export default function(state = {regular:[], recurring:[], major:[]}, action){
  switch(action.type){
    case GET_TASKS:
      const tasks = action.payload.data.tasks
      const regular = [];
      const recurring = []
      const major = [];
      tasks.map((task) => {
        task.unformatted_end_date = task.end_date;
        task.end_date = Moment(task.end_date).format('MMMM DD');
        switch(task.task_type){
          case "regular":
            regular.push(task);
            break;
          case "recurring":
            recurring.push(task);
            break;
          case "major":
            major.push(task);
            break
        }
      })
      return {regular, recurring, major}
      break;
    default:
      return state;
      break;
  }
}
