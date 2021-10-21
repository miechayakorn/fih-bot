import listCalendar from '../../../components/listCalendar'
import getEvent from '../../../components/getEvent'

const list = async (req, res) => {
    res.status(200).json(await getEvent())
}

export default list
