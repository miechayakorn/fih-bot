const initEvent = (dateObject) => {
    return {
        'summary': dateObject.HolidayDescriptionThai,
        'description': ``,
        'transparency': 'transparent',
        'start': {
            'date': dateObject.Date,
            'timeZone': 'Asia/Bangkok'
        },
        'end': {
            'date': dateObject.Date,
            'timeZone': 'Asia/Bangkok'
        }
    }
}

export default initEvent
