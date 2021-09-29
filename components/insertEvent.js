import { auth, calendar, calendarId } from '../helper/gCalendar'

const insertEvent = async (jsonFetch) => {

    const initEvent = (data) => {
        return {
            'summary': data.HolidayDescriptionThai,
            'description': ``,
            'transparency': 'transparent',
            'start': {
                'date': data.Date,
                'timeZone': 'Asia/Bangkok'
            },
            'end': {
                'date': data.Date,
                'timeZone': 'Asia/Bangkok'
            }
        }
    }

    let status = 1
    for (let i = 0; i < jsonFetch.result.data.length; i++) {
        try {
            await calendar.events.insert({
                auth: auth,
                calendarId: calendarId,
                resource: initEvent(JSON.parse(jsonFetch.result.data[i]))
            })
        } catch (error) {
            status = 0
            console.log(`Error at insertEvent --> ${error}`)
            break
        }
    }
    return status

}

export default insertEvent
