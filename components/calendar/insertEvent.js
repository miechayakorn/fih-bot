import { auth, calendar, calendarId } from '../../helper/gCalendar'
import initEvent from '../../helper/initEvent'

export const sleep = (ms) => {
    console.log('sleep = ', ms, ' ms')
    return new Promise(resolve => setTimeout(resolve, ms))
}

const insertEvent = async (dateObject) => {
    try {
        console.log('insert = ', dateObject.Date)
        await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: initEvent(dateObject)
        })
        await sleep(2 * 1000)
    } catch (error) {
        console.log(`${dateObject.Date} Error at insertEvent --> ${error}`)
    }
}

export default insertEvent
