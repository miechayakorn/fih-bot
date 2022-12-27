import { auth, calendar, calendarId } from '../../helper/gCalendar'

const getEvent = async (localYear) => {
    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: `${localYear - 1}-01-01T14:33:00.000Z`,
            timeMax: `${localYear}-12-31T14:33:59.000Z`,
            timeZone: 'Asia/Bangkok',
        })

        let items = response['data']['items']
        return items
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`)
    }
}

export default getEvent
