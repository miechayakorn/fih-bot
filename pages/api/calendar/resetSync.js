import insertEvent from '../../../components/insertEvent'
import fetchBot from '../../../components/fetch/fetchBot'
import { storeFirebase } from '../../../components/fetch/fetchFirebase'
import clearEvent from '../../../components/clearEvent'
import genChecksum from '../../../helper/genChecksum'
import { getYear } from '../../../helper/date'

const resetSync = async (req, res) => {
    const {year} = req.query
    if (year) {
        const dataBOTs = await fetchBot(year)
        const checksum = genChecksum(dataBOTs)
        await clearEvent(year)
        try {
            dataBOTs.map((event) => {
                console.log("insert = ", event.Date)
                insertEvent(event)
            })
            await storeFirebase(`mainStorage/${getYear()}`, {
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
