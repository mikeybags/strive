import {GET_TASKS} from '../actions/types'
import Moment from 'moment'

export default function(state = {regular:[], recurring:[], major:[], upcoming:[]}, action){
  switch(action.type){
    case GET_TASKS:
      const tasks = action.payload.data.tasks
      const regular = [],
      recurring = [],
      major = [],
      active = [];
      tasks.map((task) => {
        if (Moment(task.end_date).isBefore(Moment(), "day") && task.task_type != "recurring"){
          task.points = task.points * 0.6;
          task.expired = true;
        }
        if (Moment(task.start_date).isSameOrBefore(Moment(), "day")){
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
        } else {
          upcoming.push(task)
        }
        task.unformatted_end_date = task.end_date;
        task.end_date = Moment(task.end_date).format('MMMM DD');


      })
      return {regular, recurring, major}
      break;
    default:
      return state;
      break;
  }
}
