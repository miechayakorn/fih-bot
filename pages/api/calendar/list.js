import listCalendar from '../../../components/listCalendar'

const list = async (req, res) => {
    res.status(200).json(await listCalendar())
}

export default list
