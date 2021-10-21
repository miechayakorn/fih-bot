import jsum from 'jsum'
import insertEvent from '../../../components/insertEvent'
import clearEvent from '../../../components/clearEvent'
import fetchBot from '../../../components/fetch/fetchBot'
import { fetchFirebase, storeFirebase } from '../../../components/fetch/fetchFirebase'

const Index = async (req, res) => {

    let checksumStored = fetchFirebase('hash')
    let jsonFetch = fetchBot()

    const genChecksum = jsum.digest(jsonFetch.result.data, 'SHA256', 'hex')

    if (genChecksum !== checksumStored) {
        let resClearEvent = await clearEvent()
        let resInsertEvent = await insertEvent(jsonFetch)

        if (resClearEvent === 1 && resInsertEvent === 1) {
            await storeFirebase('hash', genChecksum)
            await storeFirebase('json', JSON.stringify(jsonFetch.result.data))
            res.status(201).json({msg: 'created : ' + genChecksum})
        } else {
            res.status(500).json({msg: 'failed'})
        }

    } else {
        res.status(200).json({msg: 'nothing to save'})
    }
}

export default Index
