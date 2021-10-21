import { auth, calendar, calendarId } from '../../../helper/gCalendar'

const Index = async (req, res) => {

    const clearEvent = async () => {
        try {
            let response = await calendar.events.delete({
                auth: auth,
                calendarId: calendarId
            })

            console.log(JSON.stringify(response))
            return JSON.stringify(response)

        } catch (error) {
            console.log(JSON.stringify(error))
            return 0
        }
        return 1
    }


    res.status(200).json(await clearEvent())

}

export default Index
