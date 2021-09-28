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

    try {
        JSON.parse(jsonFetch.result).data.map(async (data) => {
            await calendar.events.insert({
                auth: auth,
                calendarId: calendarId,
                resource: initEvent(JSON.parse(data))
            })
        })
        return 1
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`)
        return 0
    }

}

export default insertEvent
