import insertEvent from '../../../components/calendar/insertEvent'
import fetchBot from '../../../components/fetch/fetchBot'
import { storeFirebase } from '../../../components/fetch/fetchFirebase'
import clearAllEvent from '../../../components/calendar/clearAllEvent'
import genChecksum from '../../../helper/genChecksum'

const resetSync = async (req, res) => {
    const {year, clearOnly} = req.query
    if (year) {
        const dataBOTs = await fetchBot(year)
        const checksum = genChecksum(dataBOTs)
        await clearAllEvent(year)
        if (clearOnly === 'true') {
            console.log("clear calendar success!")
            return res.status(200).json({msg: 'clear calendar success'})
        }
        try {
            for (let i = 0; i < dataBOTs.length; i++) {
                const event = dataBOTs[i]
                await insertEvent(event)
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
