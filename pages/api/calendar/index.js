import clearEvent from '../../../components/clearEvent'
import getEvent from '../../../components/getEvent'

const Index = async (req, res) => {

    if (req.method === 'GET') {
        let data = await getEvent()
        if (data != 0) {
            res.status(200).json(data)
        } else {
            res.status(500).json({msg: 'failed'})
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
