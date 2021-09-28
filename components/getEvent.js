import { auth, calendar, calendarId } from '../helper/gCalendar'

const getEvents = async () => {
    let toDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})
    let year = new Date(toDate).getFullYear()

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: `${year}-01-01T00:00:00.000Z`,
            timeMax: `${year}-12-31T00:00:00.000Z`,
            timeZone: 'Asia/Bangkok'
        })

        let items = response['data']['items']
        return items
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`)
        return 0
    }
}

export default getEvents
