import { auth, calendar, calendarId } from '../../../../helper/gCalendar'

const insertCalendar = async (req, res) => {
    try {
        // const data = await calendar.calendars.insert({
        //     auth: auth,
        //     resource: {
        //         'summary': "วันหยุดธนาคาร",
        //         'timeZone': 'Asia/Bangkok'
        //     }
        // })
        // res.status(200).json(data)
    } catch (error) {
        console.log(`Error at insertCalendar --> ${error}`)
        res.status(500).json(error)
    }
}

export default insertCalendar
