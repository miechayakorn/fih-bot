import { auth, calendar, calendarId } from '../helper/gCalendar'
import getEvent from './getEvent'

const clearEvent = async (year) => {
    let clearData = await getEvent(year)
    for (const data of clearData) {
        try {
            let response = await calendar.events.delete({
                auth: auth,
                calendarId: calendarId,
                eventId: data.id
            })

            if (response.data !== '') {
                return 0
            }
        } catch (error) {
            console.log(`Error at deleteEvent --> ${error}`)
            return 0
        }
    }
    return 1
}

export default clearEvent
