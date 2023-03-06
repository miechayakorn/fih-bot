import { auth, calendar, calendarId } from '../../helper/gCalendar'
import { sleep } from './insertEvent'

const removeEvent = async (eventID, date) => {
    try {
        console.log('removeEvent = ', date)
        await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventID
        })
        await sleep(2 * 1000)
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export default removeEvent
