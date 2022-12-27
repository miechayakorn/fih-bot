import axios from 'axios'

export const sendNotificationToLine = async (dataSend) => {
    try {
        let message = displayMessage(dataSend)
        if (message !== 200) {
            const {data} = await axios.post(`https://maker.ifttt.com/trigger/${process.env.IFTTT_NAME}/with/key/${process.env.IFTTT_KEY}`,
                {'value1': message},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            console.log('IFTTT res = ', data)
        }
    } catch (e) {
        console.error(e)
    }
}

const displayMessage = (dataSend) => {
    let dataDisplay = ''
    let dataAdd = dataSend.ADD
    let dataUpdate = dataSend.UPDATE
    let dataDelete = dataSend.DELETE

    if (dataAdd.length === 0 && dataUpdate.length === 0 && dataDelete.length === 0) {
        return 200
    }

    const displayDate = (dateLoop) => {
        dataDisplay += 'วันที่ ' + dateLoop.DateThai + ' | ' + dateLoop.HolidayDescriptionThai + '<br>'
    }

    if (dataAdd.length > 0) {
        dataDisplay += `<br> มีการเพิ่มวันหยุด ${dataAdd.length} วัน : <br>`
        for (let i = 0; i < dataAdd.length; i++) {
            displayDate(dataAdd[i])
        }
    }
    if (dataUpdate.length > 0) {
        dataDisplay += `<br> มีการแก้ไขวันหยุด ${dataUpdate.length} วัน : <br>`
        for (let i = 0; i < dataUpdate.length; i++) {
            displayDate(dataUpdate[i])
        }
    }
    if (dataDelete.length > 0) {
        dataDisplay += `<br> มีการลดวันหยุด ${dataDelete.length} วัน : <br>`
        for (let i = 0; i < dataDelete.length; i++) {
            displayDate(dataDelete[i])
        }
    }
    return dataDisplay
}
