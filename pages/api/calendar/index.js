import clearEvent from '../../../components/calendar/clearEvent'
import getEvent from '../../../components/calendar/getEvent'

const Index = async (req, res) => {

    if (req.method === 'GET') {
        try {
            let data = await getEvent()
            res.status(200).json({length: data.length, data: data})
        } catch (e) {
            res.status(500).json({status: 'failed', error: e})
        }
    } else if (req.method === 'DELETE') {
        let responseGCal = await clearEvent()
        if (responseGCal === 1) {
            res.status(200).json({msg: 'success'})
        } else {
            res.status(500).json({msg: 'failed'})
        }
    } else {
        res.status(200).json({msg: 'exited else'})
    }

}

export default Index
