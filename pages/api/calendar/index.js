import InsertEvent from '../../../components/insertEvent'
import clearEvent from '../../../components/clearEvent'
import getEvent from '../../../components/getEvent'

const Index = async (req, res) => {

    let responseGCal = 0
    if (req.method === 'GET') {
        responseGCal = await InsertEvent()
    } else if (req.method === 'DELETE') {
        responseGCal = await clearEvent()
    } else if (req.method === 'OPTIONS') {
        let data = await getEvent()
        res.status(200).json(data)
    } else {
        res.status(200).json({msg: 'exited else'})
    }

    if (responseGCal === 0) {
        res.status(200).json({msg: 'failed'})
    } else if (responseGCal === 1) {
        res.status(200).json({msg: 'success'})
    }

}

export default Index
