import { auth, calendar, calendarId } from '../helper/gCalendar'

const getEvents = async () => {
    let toDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})
    let year = new Date(toDate).getFullYear()

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: `${year-1}-01-01T14:33:00.000Z`,
            timeMax: `${year}-12-31T14:33:59.000Z`,
            timeZone: 'Asia/Bangkok',
        })

        let items = response['data']['items']
        return items
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`)
        return 0
    }
}

export default getEvents
