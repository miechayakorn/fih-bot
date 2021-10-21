import { auth, calendar, calendarId } from '../helper/gCalendar'

const removeEvent = async (eventID) => {
    try {
        await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventID
        })

    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export default removeEvent
