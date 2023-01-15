import { auth, calendar, calendarId } from '../../helper/gCalendar'

const insertUserToCalendar = async (email) => {
    await calendar.acl.insert({
        auth: auth,
        calendarId: calendarId,
        resource: {
            role: 'reader',
            scope: {
                'type': 'user',
                'value': email
            }
        }
    })
}

export default insertUserToCalendar
