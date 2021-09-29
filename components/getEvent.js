import { auth, calendar, calendarId } from '../helper/gCalendar'
import getYear from '../helper/getYear'

const getEvent = async () => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: `${getYear() - 1}-01-01T14:33:00.000Z`,
            timeMax: `${getYear()}-12-31T14:33:59.000Z`,
            timeZone: 'Asia/Bangkok',
        })

        let items = response['data']['items']
        return items
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`)
        return 0
    }
}

export default getEvent
