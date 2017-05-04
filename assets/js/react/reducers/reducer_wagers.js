import { GET_WAGERS } from '../actions/types'
import Moment from 'moment'

export default function(state = {sent_requests : [], received_requests : [], received_active : [], sent_active : []}, action) {
  switch(action.type) {
    case GET_WAGERS:
      const wagers = action.payload.data.wagers;
      console.log(wagers);
      const sent_requests = [],
      received_requests = [],
      received_active = [],
      sent_active = []
      wagers.map((wager) => {
        wager.end_date = Moment(wager.task__end_date).format('MMMM DD');
        wager.message = `${wager.wagerer__username} bet ${wager.points} points you won't finish ""${wager.task__name}"" before ${wager.end_date}`
          if (wager.current_user == wager.wagerer){
            if (wager.accepted == false){
              sent_requests.push(wager)
            }
            else {
              wager.message = `You bet ${wager.points} points ${wager.task__user__username} won't finish ${wager.task__name} before ${wager.end_date}`
              sent_active.push(wager)
            }
          }
          else {
            if (wager.accepted == false){
              received_requests.push(wager)
            }
            else {
              received_active.push(wager)
            }
          }

      })
      return {sent_requests, received_requests, received_active, sent_active};
    default:
      return state;
  }
}
