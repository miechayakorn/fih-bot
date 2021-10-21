import { auth, calendar, calendarId } from '../helper/gCalendar'
import initEvent from '../helper/initEvent'

const insertEvent = async (dateObject) => {
    try {
        await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: initEvent(dateObject)
        })
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`)
    }
}

export default insertEvent
