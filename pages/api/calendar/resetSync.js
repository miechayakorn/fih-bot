import insertEvent from '../../../components/insertEvent'
import fetchBot from '../../../components/fetch/fetchBot'
import { storeFirebase } from '../../../components/fetch/fetchFirebase'
import clearEvent from '../../../components/clearEvent'
import genChecksum from '../../../helper/genChecksum'

const resetSync = async (req, res) => {
    const dataBOTs = await fetchBot()
    const checksum = genChecksum(dataBOTs)

    await clearEvent()
    try {
        dataBOTs.map((event) => {
            insertEvent(JSON.parse(event))
        })
        await storeFirebase('hash', checksum)
        await storeFirebase('data', dataBOTs)
        res.status(201).json({msg: 'created : ' + checksum})
    } catch (e) {
        console.log(e)
        res.status(500).json({msg: 'failed'})
    }

}

export default resetSync
