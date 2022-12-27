import { fetchFirebase, storeFirebase } from '../../../components/fetch/fetchFirebase'
import insertEvent from '../../../components/insertEvent'
import getEvent from '../../../components/getEvent'
import removeEvent from '../../../components/removeEvent'
import updateEvent from '../../../components/updateEvent'
import genChecksum from '../../../helper/genChecksum'
import { sendNotificationToLine } from '../../../components/fetch/ifttt'
import getYear from '../../../helper/getYear'

const sync = async (req, res) => {
    const thisYearHashPath = `mainStorage/${getYear()}/hash`
    const thisYearDataPath = `mainStorage/${getYear()}/data`

    // let dataBOTs = await fetchBot()
    let dataBOTs = [
        {
            'Date': '2022-01-03',
            'DateThai': '03/01/2565',
            'HolidayDescription': 'Substitution for New Year\'s Day\r\n(Saturday 1st January 2022)',
            'HolidayDescriptionThai': 'ชดเชยวันขึ้นปีใหม่\r\n(วันเสาร์ที่ 1 มกราคม 2565)',
            'HolidayWeekDay': 'Monday',
            'HolidayWeekDayThai': 'วันจันทร์'
        },
        {
            'Date': '2022-02-16',
            'DateThai': '16/02/2565',
            'HolidayDescription': 'Makha Bucha Day',
            'HolidayDescriptionThai': 'วันมาฆบูชา',
            'HolidayWeekDay': 'Wednesday',
            'HolidayWeekDayThai': 'วันพุธ'
        },
        {
            'Date': '2022-04-06',
            'DateThai': '06/04/2565',
            'HolidayDescription': 'Chakri Memorial Day',
            'HolidayDescriptionThai': 'วันพระบาทสมเด็จพระพุทธยอดฟ้าจุฬาโลกมหาราช\r\nและวันที่ระลึกมหาจักรีบรมราชวงศ์',
            'HolidayWeekDay': 'Wednesday',
            'HolidayWeekDayThai': 'วันพุธ'
        },
        {
            'Date': '2022-04-13',
            'DateThai': '13/04/2565',
            'HolidayDescription': 'Songkran Festival',
            'HolidayDescriptionThai': 'วันสงกรานต์',
            'HolidayWeekDay': 'Wednesday',
            'HolidayWeekDayThai': 'วันพุธ'
        },
        {
            'Date': '2022-04-14',
            'DateThai': '14/04/2565',
            'HolidayDescription': 'Songkran Festival',
            'HolidayDescriptionThai': 'วันสงกรานต์',
            'HolidayWeekDay': 'Thursday',
            'HolidayWeekDayThai': 'วันพฤหัสบดี'
        },
        {
            'Date': '2022-04-15',
            'DateThai': '15/04/2565',
            'HolidayDescription': 'Songkran Festival',
            'HolidayDescriptionThai': 'วันสงกรานต์',
            'HolidayWeekDay': 'Friday',
            'HolidayWeekDayThai': 'วันศุกร์'
        },
        {
            'Date': '2022-05-02',
            'DateThai': '02/05/2565',
            'HolidayDescription': 'Substitution for National Labour Day\r\n(Sunday 1st May 2022)',
            'HolidayDescriptionThai': 'ชดเชยวันแรงงานแห่งชาติ\r\n(วันอาทิตย์ที่ 1 พฤษภาคม 2565)',
            'HolidayWeekDay': 'Monday',
            'HolidayWeekDayThai': 'วันจันทร์'
        },
        {
            'Date': '2022-05-04',
            'DateThai': '04/05/2565',
            'HolidayDescription': 'Coronation Day',
            'HolidayDescriptionThai': 'วันฉัตรมงคล',
            'HolidayWeekDay': 'Wednesday',
            'HolidayWeekDayThai': 'วันพุธ'
        },
        {
            'Date': '2022-05-16',
            'DateThai': '16/05/2565',
            'HolidayDescription': 'Substitution for Wisakha Bucha Day\r\n(Sunday 15th May 2022)',
            'HolidayDescriptionThai': 'ชดเชยวันวิสาขบูชา\r\n(วันอาทิตย์ที่ 15 พฤษภาคม 2565)',
            'HolidayWeekDay': 'Monday',
            'HolidayWeekDayThai': 'วันจันทร์'
        },
        {
            'Date': '2022-06-03',
            'DateThai': '03/06/2565',
            'HolidayDescription': 'H.M. Queen Suthida Bajrasudhabimalalakshana’s Birthday',
            'HolidayDescriptionThai': 'วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าสุทิดา\r\nพัชรสุธาพิมลลักษณ พระบรมราชินี',
            'HolidayWeekDay': 'Friday',
            'HolidayWeekDayThai': 'วันศุกร์'
        },
        {
            'Date': '2022-07-13',
            'DateThai': '13/07/2565',
            'HolidayDescription': 'Asarnha Bucha Day',
            'HolidayDescriptionThai': 'วันอาสาฬหบูชา',
            'HolidayWeekDay': 'Wednesday',
            'HolidayWeekDayThai': 'วันพุธ'
        },
        {
            'Date': '2022-07-28',
            'DateThai': '28/07/2565',
            'HolidayDescription': 'H.M. King Maha Vajiralongkorn Phra Vajiraklaochaoyuhua’s Birthday',
            'HolidayDescriptionThai': 'วันเฉลิมพระชนมพรรษา\r\nพระบาทสมเด็จพระเจ้าอยู่หัว',
            'HolidayWeekDay': 'Thursday',
            'HolidayWeekDayThai': 'วันพฤหัสบดี'
        },
        {
            'Date': '2022-07-29',
            'DateThai': '29/07/2565',
            'HolidayDescription': 'Additional special holiday (added)',
            'HolidayDescriptionThai': 'วันหยุดพิเศษ (เพิ่มเติม)',
            'HolidayWeekDay': 'Friday',
            'HolidayWeekDayThai': 'วันศุกร์'
        },
        {
            'Date': '2022-08-12',
            'DateThai': '12/08/2565',
            'HolidayDescription': 'H.M. Queen Sirikit The Queen Mother’s Birthday / Mother’s Day',
            'HolidayDescriptionThai': 'วันเฉลิมพระชนมพรรษา\r\nสมเด็จพระนางเจ้าสิริกิติ์ พระบรมราชินีนาถ\r\nพระบรมราชชนนีพันปีหลวง และวันแม่แห่งชาติ',
            'HolidayWeekDay': 'Friday',
            'HolidayWeekDayThai': 'วันศุกร์'
        },
        {
            'Date': '2022-10-13',
            'DateThai': '13/10/2565',
            'HolidayDescription': 'H.M. King Bhumibol Adulyadej The Great Memorial Day',
            'HolidayDescriptionThai': 'วันคล้ายวันสวรรคต\r\nพระบาทสมเด็จพระบรมชนกาธิเบศร\r\nมหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร',
            'HolidayWeekDay': 'Thursday',
            'HolidayWeekDayThai': 'วันพฤหัสบดี'
        },
        {
            'Date': '2022-10-14',
            'DateThai': '14/10/2565',
            'HolidayDescription': 'Additional special holiday (added)',
            'HolidayDescriptionThai': 'วันหยุดพิเศษ (เพิ่มเติม)',
            'HolidayWeekDay': 'Friday',
            'HolidayWeekDayThai': 'วันศุกร์'
        },
        {
            'Date': '2022-10-24',
            'DateThai': '24/10/2565',
            'HolidayDescription': 'Substitution for Chulalongkorn Day\r\n(Sunday 23rd October 2022)',
            'HolidayDescriptionThai': 'ชดเชยวันปิยมหาราช\r\n(วันอาทิตย์ที่ 23 ตุลาคม 2565)',
            'HolidayWeekDay': 'Monday',
            'HolidayWeekDayThai': 'วันจันทร์'
        },
        {
            'Date': '2022-12-05',
            'DateThai': '05/12/2565',
            'HolidayDescription': 'H.M. King Bhumibol Adulyadej\r\nThe Great’s Birthday/ National Day / Father’s Day',
            'HolidayDescriptionThai': 'วันคล้ายวันพระบรมราชสมภพของ\r\nพระบาทสมเด็จพระบรมชนกาธิเบศร\r\nมหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร\r\nวันชาติ และวันพ่อแห่งชาติ',
            'HolidayWeekDay': 'Monday',
            'HolidayWeekDayThai': 'วันจันทร์'
        },
        {
            'Date': '2022-12-12',
            'DateThai': '12/12/2565',
            'HolidayDescription': 'Substitution for Constitution Day\r\n(Saturday 10th December 2022)',
            'HolidayDescriptionThai': 'ชดเชยวันรัฐธรรมนูญ\r\n(วันเสาร์ที่ 10 ธันวาคม 2565)',
            'HolidayWeekDay': 'Monday',
            'HolidayWeekDayThai': 'วันจันทร์'
        }
        // ,
        // {
        //     'Date': '2022-12-28',
        //     'DateThai': '28/12/2565',
        //     'HolidayDescription': 'Substitution for Constitution Day\r\n(Saturday 10th December 2022)',
        //     'HolidayDescriptionThai': 'TEST 555',
        //     'HolidayWeekDay': 'Monday',
        //     'HolidayWeekDayThai': 'วันจันทร์'
        // }
        // ,
        // {
        //     'Date': '2022-12-29',
        //     'DateThai': '29/12/2565',
        //     'HolidayDescription': 'Substitution for Constitution Day\r\n(Saturday 10th December 2022)',
        //     'HolidayDescriptionThai': 'TEST 29 555',
        //     'HolidayWeekDay': 'Monday',
        //     'HolidayWeekDayThai': 'วันจันทร์'
        // }
    ]

    const checksum = genChecksum(dataBOTs)
    let hashStored = await fetchFirebase(thisYearHashPath)
    let isDataChanged = (checksum !== hashStored)

    if (dataBOTs && isDataChanged) {
        let responseData = {
            ADD: [],
            UPDATE: [],
            DELETE: []
        }
        const dateNow = new Date().toLocaleDateString('en-CA')
        let dataStores = await fetchFirebase(thisYearDataPath)

        if (dataStores) {
            for (let i = 0; i < dataBOTs.length; i++) {
                // filter future date
                if (dateNow <= dataBOTs[i].Date) {
                    validateData(dateNow, dataBOTs[i], dataStores, responseData)
                }
            }

            if (dataStores.length > 0) {
                // Delete Event
                dataStores.map(async (delEvent) => {
                    if (dateNow <= delEvent.Date) {
                        responseData.DELETE = [...responseData.DELETE, delEvent]
                        let listEvents = await getEvent()
                        await removeEvent(listEvents.find(event => event.start.date === delEvent.Date).id)
                    }
                })
            }
            await storeFirebase(`mainStorage/${getYear()}`, {
                hash: checksum,
                data: dataBOTs
            })
            await sendNotificationToLine(responseData)
            res.status(201).json(responseData)
        } else {
            res.status(202).json({msg: 'nothing to do :P'})
        }
    } else {
        res.status(200).json({msg: 'nothing to save :D'})
    }
}

const validateData = async (dateNow, dataBOT, dataStores, responseData) => {
    let isFound = false
    for (let i = 0; i < dataStores.length; i++) {
        // future date in dataStore
        if (dateNow <= dataStores[i].Date) {
            if (dataStores[i].Date === dataBOT.Date) {
                isFound = true
                if (dataStores[i].HolidayDescriptionThai !== dataBOT.HolidayDescriptionThai) {
                    // Update Event
                    console.log('UPDATE', dataBOT)
                    responseData.UPDATE.push(dataBOT)
                    dataStores.splice(i, 1)
                    let listEvents = await getEvent()
                    await updateEvent(listEvents.find(event => event.start.date === dataBOT.Date).id, dataBOT)
                } else {
                    dataStores.splice(i, 1)
                }
                break
            }
        } else {
            dataStores.splice(i, 1)
            i--
        }
    }

    if (isFound === false) {
        // Add Event
        console.log('ADD', dataBOT)
        responseData.ADD.push(dataBOT)
        await insertEvent(dataBOT)
    }
}

export default sync
