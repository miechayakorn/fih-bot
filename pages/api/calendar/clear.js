
import { auth, calendar, calendarId } from '../../../helper/gCalendar'
import clearEvent from '../../../components/clearEvent'

const Index = async (req, res) => {

    // const clearEvent = async () => {
    //     try {
    //         let response = await calendar.calendars.clear({
    //             auth: auth,
    //             "calendarId": "primary"
    //         })
    //
    //         console.log(JSON.stringify(response))
    //         return JSON.stringify(response)
    //     } catch (error) {
    //         console.log(JSON.stringify(error))
    //         return JSON.stringify(error)
    //     }
    // }


    res.status(200).json(await clearEvent())

}

export default Index
