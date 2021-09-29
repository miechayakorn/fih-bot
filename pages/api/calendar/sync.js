import firebase from '../../../helper/firebase'
import jsum from 'jsum'
import insertEvent from '../../../components/insertEvent'
import clearEvent from '../../../components/clearEvent'
import getYear from '../../../helper/getYear'

const Index = async (req, res) => {

    const connChecksumStored = firebase.ref('hash')

    let checksumStored
    await connChecksumStored.on('value', snapshot => {
        checksumStored = snapshot.val()
    })

    let jsonFetch = await fetch(`https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=${getYear()}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-ibm-client-id': process.env.CLIENT_ID
        },
    })
    jsonFetch = await jsonFetch.json()

    const genChecksum = jsum.digest(jsonFetch, 'SHA256', 'hex')

    if (genChecksum !== checksumStored) {

        let resClearEvent = await clearEvent()
        let resInsertEvent = await insertEvent(jsonFetch)

        if (resClearEvent === 1 && resInsertEvent) {
            await connChecksumStored.set(genChecksum)
            const connJSON = firebase.ref('json')
            await connJSON.set(JSON.stringify(jsonFetch))
            res.status(201).json({msg: 'created : ' + genChecksum})
        } else {
            res.status(500).json({msg: 'failed'})
        }

    } else {
        res.status(200).json({msg: 'nothing to save'})
    }
}

export default Index
