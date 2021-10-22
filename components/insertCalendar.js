import { auth, calendar, calendarId } from '../helper/gCalendar'

const insertCalendar = async () => {
    try {
        let response = await calendar.calendars.delete({
            auth: auth,
            calendarId: calendarId,
            resource: {
                role: 'writer',
                scope: {
                    'type': 'user',
                    'value': 'EMAIL' // TODO change EMAIL before use it
                }
            }
        })
        console.log('=========================')
        console.log(JSON.stringify(response))
        console.log('=========================')
        return response
    } catch (error) {
        console.log(`${error}`)
        return 0
    }
}

export default insertCalendar
