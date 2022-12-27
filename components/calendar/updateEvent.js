import { auth, calendar, calendarId } from '../../helper/gCalendar'
import initEvent from '../../helper/initEvent'

const updateEvent = async (eventID, dataBOT) => {
    try {
        await calendar.events.update({
            auth: auth,
            calendarId: calendarId,
            eventId: eventID,
            resource: initEvent(dataBOT)
        })

    } catch (error) {
        console.log(JSON.stringify(error))
    }

}

export default updateEvent
