import fetchBot from '../../../components/fetch/fetchBot'
import { fetchFirebase, storeFirebase } from '../../../components/fetch/fetchFirebase'
import insertEvent from '../../../components/insertEvent'
import getEvent from '../../../components/getEvent'
import removeEvent from '../../../components/removeEvent'
import updateEvent from '../../../components/updateEvent'
import genChecksum from '../../../helper/genChecksum'

const sync = async (req, res) => {
    let dataBOTs = await fetchBot()
    const checksum = genChecksum(dataBOTs)
    let hashStored = await fetchFirebase('hash')
    let isDataChanged = (checksum !== hashStored)

    if (dataBOTs && isDataChanged) {
        let responseData = {
            ADD: [],
            UPDATE: [],
            DELETE: []
        }
        const dateNow = new Date().toLocaleDateString('en-CA')
        let dataStores = await fetchFirebase('data')

        if (dataStores) {
            for (let i = 0; i < dataBOTs.length; i++) {
                if (dateNow <= dataBOTs[i].Date) {
                    validateData(dateNow, dataBOTs[i], dataStores, responseData)
                }
            }

            if (dataStores.length > 0) {
                // Delete Event
                console.log('DELETE', dataStores)
                responseData.DELETE.push(dataStores)
                dataStores.map(async (delEvent) => {
                    let listEvents = await getEvent()
                    await removeEvent(listEvents.find(event => event.start.date === delEvent.Date).id)
                })
            }
            await storeFirebase('hash', checksum)
            await storeFirebase('data', dataBOTs)

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
