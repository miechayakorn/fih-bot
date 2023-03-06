import { auth, calendar, calendarId } from '../../../../helper/gCalendar'

const removeCalendar = async (req, res) => {
    try {
        // console.log("calendarId", calendarId)
        // const data = await calendar.calendars.delete({
        //     auth: auth,
        //     calendarId: calendarId,
        // })
        // console.log(data)
        // res.status(200).json(data)
    } catch (error) {
        console.log(`Error at deleteCalendat --> ${error}`)
        res.status(500).json(error)
    }
}

export default removeCalendar
