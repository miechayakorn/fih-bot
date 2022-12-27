import { fetchFirebase, storeFirebase } from '../../../components/fetch/fetchFirebase'
import insertEvent from '../../../components/insertEvent'
import getEvent from '../../../components/getEvent'
import removeEvent from '../../../components/removeEvent'
import updateEvent from '../../../components/updateEvent'
import genChecksum from '../../../helper/genChecksum'
import { getMonth, getYear } from '../../../helper/date'
import fetchBot from '../../../components/fetch/fetchBot'
import { sendNotificationToLine } from '../../../components/fetch/ifttt'

const sync = async (req, res) => {
    let dataResponse = {}
    const year = getYear()

    if (getMonth() >= 8) {
        let calendarNextYear = await fetchBot(year + 1)
        if (calendarNextYear) {
            const dateNow = genTargetDate(year + 1, true)
            const nextYearRes = await syncCalendar(res, year + 1, dateNow)
            console.log('========nextYearResponse==>', nextYearRes)
            if (nextYearRes !== 200 && nextYearRes) {
                dataResponse = {
                    [year + 1]: nextYearRes,
                    ...dataResponse
                }
            }
        }
    }
    console.log('==============================================================================================')
    const dateNow = genTargetDate(year)
    const response = await syncCalendar(res, year, dateNow)
    if (response === 200) {
        console.log('========response==>', response)
        res.status(200).json({msg: 'nothing to save :D'})
    } else if (response) {
        dataResponse = {
            [year]: response,
            ...dataResponse
        }
        console.log('========response==>', response)
        await sendNotificationToLine(response)
        res.status(201).json(dataResponse)
    }
}

const syncCalendar = async (res, localYear, dateNow) => {
    const thisYearHashPath = `mainStorage/${localYear}/hash`
    const thisYearDataPath = `mainStorage/${localYear}/data`

    let dataBOTs = await fetchBot(localYear)
    const checksum = genChecksum(dataBOTs)
    let hashStored = await fetchFirebase(thisYearHashPath)
    let isDataChanged = (checksum !== hashStored)

    if (dataBOTs && isDataChanged) {

        let responseData = {
            ADD: [],
            UPDATE: [],
            DELETE: []
        }
        let dataStores = await fetchFirebase(thisYearDataPath)
        for (let i = 0; i < dataBOTs.length; i++) {
            // filter future date
            if (dateNow <= dataBOTs[i].Date) {
                await validateData(dateNow, dataBOTs[i], dataStores, responseData, localYear)
            }
        }

        if (dataStores && dataStores.length > 0) {
            // Delete Event
            dataStores.map(async (delEvent) => {
                if (dateNow <= delEvent.Date) {
                    responseData.DELETE = [...responseData.DELETE, delEvent]
                    let listEvents = await getEvent(localYear)
                    await removeEvent(listEvents.find(event => event.start.date === delEvent.Date).id)
                }
            })
        }
        await storeFirebase(`mainStorage/${localYear}`, {
            hash: checksum,
            data: dataBOTs
        })
        return responseData
    } else {
        return 200
    }
}

const validateData = async (dateNow, dataBOT, dataStores, responseData, localYear) => {
    let isFound = false
    if (dataStores) {
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
                        let listEvents = await getEvent(localYear)
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
    }
    if (isFound === false) {
        // Add Event
        console.log('ADD', dataBOT)
        responseData.ADD.push(dataBOT)
        await insertEvent(dataBOT)
    }
}


const genTargetDate = (year, isNextYear = false) => {
    let dateNow
    if (isNextYear) {
        dateNow = new Date(year, 0, 1).toLocaleDateString('en-CA', {timeZone: 'Asia/Bangkok'})
    } else {
        const currentDate = new Date()
        dateNow = new Date(year, currentDate.getMonth(), currentDate.getDate()).toLocaleDateString('en-CA', {timeZone: 'Asia/Bangkok'})
    }
    return dateNow
}

export default sync
