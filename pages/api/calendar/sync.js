import { fetchFirebase, storeFirebase } from '../../../components/fetch/fetchFirebase'
import insertEvent from '../../../components/calendar/insertEvent'
import getEvent from '../../../components/calendar/getEvent'
import removeEvent from '../../../components/calendar/removeEvent'
import updateEvent from '../../../components/calendar/updateEvent'
import genChecksum from '../../../helper/genChecksum'
import { getMonth, getYear } from '../../../helper/date'
import fetchBot from '../../../components/fetch/fetchBot'
import { sendNotificationToLine } from '../../../components/fetch/ifttt'

const sync = async (req, res) => {
    console.log('------------------------- start :D -------------------------')
    let dataResponse = {}
    const year = getYear()
    // check month more than 8 to fetch newYear if BOT has
    if (getMonth() >= 8) {
        const nextYearRes = await syncCalendar(res, year + 1)
        console.log('========nextYearResponse==>', nextYearRes)
        if (nextYearRes && nextYearRes !== 200) {
            dataResponse = {
                [year + 1]: nextYearRes,
                ...dataResponse
            }
        }
    }
    const response = await syncCalendar(res, year)

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

const syncCalendar = async (res, localYear) => {
    const thisYearHashPath = `mainStorage/${localYear}/hash`
    const thisYearDataPath = `mainStorage/${localYear}/data`

    let dataBOTs = await fetchBot(localYear)
    if (!dataBOTs) {
        return 200
    }
    const checksum = genChecksum(dataBOTs)
    let hashStored = await fetchFirebase(thisYearHashPath)
    let isDataChanged = (checksum !== hashStored)

    if (dataBOTs && isDataChanged) {
        let dataFB = await fetchFirebase(thisYearDataPath)
        let dataCalendar = await getEvent(localYear)
        const responseData = compareJSONArrays(dataBOTs, dataFB, dataCalendar)
        await storeFirebase(`mainStorage/${localYear}`, {
            hash: checksum,
            data: dataBOTs
        })
        return responseData
    } else {
        return 200
    }
}

const compareJSONArrays = async (dataBOTs, dataFB, dataCalendar) => {
    const responseData = {
        ADD: [],
        UPDATE: [],
        DELETE: [],
    }

    for (let i = 0; i < dataBOTs.length; i++) {
        const obj1 = dataBOTs[i]
        const obj2 = dataFB?.find((o) => o.Date === obj1.Date)

        if (obj2) {
            if (!isEqual(obj1, obj2)) {
                const eventId = dataCalendar.find(event => event.start.date === obj1.Date).id
                await updateEvent(eventId, obj1)
                responseData.UPDATE.push(obj1)
            }
        } else {
            await insertEvent(obj1)
            responseData.ADD.push(obj1)
        }
    }

    if (dataFB) {
        for (let i = 0; i < dataFB.length; i++) {
            const obj2 = dataFB[i]
            const obj1 = dataBOTs.find((o) => o.Date === obj2.Date)

            if (!obj1) {
                const eventId = dataCalendar.find(event => event.start.date === obj2.Date).id
                await removeEvent(eventId, obj2.Date)
                responseData.DELETE.push(obj2)
            }
        }
    }

    return responseData
}

const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export default sync
