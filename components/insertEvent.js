import { auth, calendar, calendarId } from '../helper/gCalendar'

const insertEvent = async (jsonFetch) => {

    // Event for Google Index
    let event = {
        'summary': `This asdads is the summary.`,
        'description': `This is the description.`,
        'transparency': 'transparent',
        'start': {
            'date': '2021-09-28',
            'timeZone': 'Asia/Bangkok'
        },
        'end': {
            'date': '2021-09-28',
            'timeZone': 'Asia/Bangkok'
        }
    }

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        })

        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1
        } else {
            return 0
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`)
        return 0
    }

}

export default insertEvent
