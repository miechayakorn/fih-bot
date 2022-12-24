import { sendNotificationToLine } from '../../../components/fetch/ifttt'

const NotiLine = async (req, res) => {
    try {
        let responseData = {
            ADD: [
                {
                    HolidayWeekDay: 'Friday',
                    HolidayWeekDayThai: 'วันศุกร์',
                    Date: '2022-08-12',
                    DateThai: '12/08/2565',
                    HolidayDescription: 'test add 1',
                    HolidayDescriptionThai: 'ทดสอบ เพิ่ม 1'
                },
                {
                    HolidayWeekDay: 'Thursday',
                    HolidayWeekDayThai: 'วันพฤหัสบดี',
                    Date: '2022-10-13',
                    DateThai: '13/10/2565',
                    HolidayDescription: 'test add 2',
                    HolidayDescriptionThai: 'ทดสอบ เพิ่ม 2'
                }
            ],
            UPDATE: [
                {
                    HolidayWeekDay: 'Monday',
                    HolidayWeekDayThai: 'วันจันทร์',
                    Date: '2022-10-24',
                    DateThai: '24/10/2565',
                    HolidayDescription: 'test update 1',
                    HolidayDescriptionThai: 'ทดสอบ แก้ไข 1'
                }
            ],
            DELETE: [
                {
                    HolidayWeekDay: 'Monday',
                    HolidayWeekDayThai: 'วันจันทร์',
                    Date: '2022-12-05',
                    DateThai: '05/12/2565',
                    HolidayDescription: 'test delete 1',
                    HolidayDescriptionThai: 'ทดสอบ ลบ 1'
                }
            ]
        }
        await sendNotificationToLine(responseData)
        res.status(200).json({data: 'send success!'})
    } catch (e) {
        res.status(500).json({status: 'failed', error: e})
    }

}

export default NotiLine
