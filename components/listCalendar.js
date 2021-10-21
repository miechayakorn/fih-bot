import { auth, calendar } from '../helper/gCalendar'

const listCalendar = async () => {
    try {
        let response = await calendar.calendarList.list({
            'auth': auth
        })
        console.log('=========================')
        console.log(JSON.stringify(response.data.items[0]))
        console.log('=========================')
        return response.data.items
    } catch (error) {
        console.log(`${error}`)
        return 0
    }
}

export default listCalendar
