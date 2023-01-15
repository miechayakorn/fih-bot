import insertEvent from '../../../components/calendar/insertEvent'
import fetchBot from '../../../components/fetch/fetchBot'
import { storeFirebase } from '../../../components/fetch/fetchFirebase'
import clearEvent from '../../../components/calendar/clearEvent'
import genChecksum from '../../../helper/genChecksum'
import { getYear } from '../../../helper/date'

const sleep = (ms) => {
    console.log('sleep = ', ms, ' ms')
    return new Promise(resolve => setTimeout(resolve, ms))
}

const resetSync = async (req, res) => {
    const {year} = req.query
    if (year) {
        const dataBOTs = await fetchBot(year)
        const checksum = genChecksum(dataBOTs)
        await clearEvent(year)
        try {
            for (let i = 0; i < dataBOTs.length; i++) {
                const event = dataBOTs[i]
                console.log('insert = ', event.Date)
                await insertEvent(event)
                await sleep(2 * 1000)
            }
            await storeFirebase(`mainStorage/${year}`, {
                hash: checksum,
                data: dataBOTs
            })
            res.status(201).json({msg: 'created : ' + checksum})
        } catch (e) {
            console.log(e)
            res.status(500).json({msg: 'failed'})
        }
    } else {
        res.status(400).json({msg: 'must to set year in param'})
    }

}

export default resetSync
