import { auth, calendar, calendarId } from '../../helper/gCalendar'
import getEvent from './getEvent'
import { sleep } from './insertEvent'

const clearAllEvent = async (year) => {
    let clearData = await getEvent(year)
    try {
        for (let i = 0; i < clearData.length; i++) {
            const data = clearData[i]
            console.log('clearEvent = ', data.start.date)
            let response = await calendar.events.delete({
                auth: auth,
                calendarId: calendarId,
                eventId: data.id
            })
            if (response.data !== '') {
                return 0
            }
            await sleep(2 * 1000)
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`)
        return 0
    }
    return 1
}

export default clearAllEvent
