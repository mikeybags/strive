import { GET_FEED } from '../actions/types';
import Moment from 'moment';


export default function( state = {}, action ) {
  switch (action.type) {
    case GET_FEED:
      const activities = action.payload.data.activities;
      const id = action.payload.data.id;
      activities.map((activity)=> {
        activity.created_at = Moment(activity.created_at).fromNow()
        if (activity.verb === "created") {
          activity.task__end_date = Moment(activity.task__end_date).format('MMMM DD, YYYY');
          activity.message = `${activity.user__username} created the task "${activity.task__name}" to be completed by ${activity.task__end_date}.`
        } else if (activity.verb === "accepted") {
          activity.wager__task__end_date = Moment(activity.wager__task__end_date).format('MMMM DD, YYYY');
          if (activity.wager__wagerer_id === id) {
            activity.message = `${activity.user__username} accepted your ${activity.wager__points} Strive point wager on the task "${activity.wager__task__name}" to be completed by ${activity.wager__task__end_date}.`
          } else {
            activity.message = `${activity.user__username} accepted ${activity.wager__wagerer__username}'s ${activity.wager__points} Strive point wager on the task "${activity.wager__task__name}" to be completed by ${activity.wager__task__end_date}.`
          }
        } else if (activity.verb === "won") {
          if (activity.wager__loser_id === id) {
            activity.message = `${activity.user__username} won ${activity.wager__points} Strive points from their wager on the task "${activity.wager__task__name}" against you.`
          } else {
            activity.message = `${activity.user__username} won ${activity.wager__points} Strive points from their wager on the task "${activity.wager__task__name}" against ${activity.wager__loser__username}.`
          }
        } else if (activity.verb === "lost") {
          if (activity.wager__winner_id === id) {
            activity.message = `${activity.user__username} lost ${activity.wager__points} Strive points from their wager on the task "${activity.wager__task__name}" against you.`
          } else {
            activity.message = `${activity.user__username} lost ${activity.wager__points} Strive points from their wager on the task "${activity.wager__task__name}" against ${activity.wager__winner__username}.`
          }
        } else if (activity.verb === "completed") {
          activity.message = `${activity.user__username} earned ${activity.task__points} Strive points by completing their task "${activity.task__name}".`
        } else if (activity.verb === "wagered") {
          if (activity.task__user_id === id) {
            activity.message = `${activity.user__username} wagered ${activity.wager__points} Strive points against you on your task "${activity.task__name}".`
          } else {
            activity.message = `${activity.user__username} wagered ${activity.wager__points} Strive points against ${activity.task__user__username} on their task "${activity.task__name}".`
          }
        }
      });
      return activities;
    default:
      return state;
  }
}
