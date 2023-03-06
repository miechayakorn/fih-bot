import { auth, calendar, calendarId } from '../../helper/gCalendar'
import initEvent from '../../helper/initEvent'
import { sleep } from './insertEvent'

const updateEvent = async (eventID, dataBOT) => {
    try {
        console.log('updateEvent = ', dataBOT.Date)
        await calendar.events.update({
            auth: auth,
            calendarId: calendarId,
            eventId: eventID,
            resource: initEvent(dataBOT)
        })
        await sleep(2 * 1000)
    } catch (error) {
        console.log(JSON.stringify(error))
    }

}

export default updateEvent
