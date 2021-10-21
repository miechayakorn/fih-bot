import fetchBot from '../../../components/fetch/fetchBot'
import { fetchFirebase } from '../../../components/fetch/fetchFirebase'

const sync = async (req, res) => {
    const dateNow = new Date().toLocaleDateString('en-CA')
    let dataBOTs = await fetchBot()
    let dataStores = await fetchFirebase('data')

    for (let i = 0; i < dataBOTs.length; i++) {
        if (dateNow <= dataBOTs[i].Date) {
            validateData(dateNow, dataBOTs[i], dataStores)
        }
    }

    if (dataStores.length > 0) {
        console.log('DELETE', JSON.stringify(dataStores))
        // Delete data in each dataStore to GGCalendar
    }


    //return status CRUD
    res.status(200).json(dataStores)

}

const validateData = (dateNow, dataBOT, dataStores) => {
    let isFound = false
    for (let i = 0; i < dataStores.length; i++) {
        if (dateNow <= dataStores[i].Date) {
            if (dataStores[i].Date === dataBOT.Date) {
                isFound = true
                if (dataStores[i].HolidayDescriptionThai !== dataBOT.HolidayDescriptionThai) {
                    // Update Calendar
                    console.log('UPDATE', dataBOT)
                }
                dataStores.splice(i, 1)
                break
            }
        } else {
            dataStores.splice(i, 1)
            i--
        }
    }

    if (isFound === false) {
        // Add Calendar
        console.log('ADD', dataBOT)
    }
}

export default sync
