import insertUserToCalendar from '../../../components/calendar/insertUserToCalendar'
import { emailRegex } from '../../../helper/validate'

const User = async (req, res) => {
    const {email} = req.query
    if (email) {
        if (!emailRegex.test(email)) {
            return res.status(400).json({msg: 'Invalid email'})
        }
        try {
            await insertUserToCalendar(email)
            res.status(201).json({msg: 'created'})
        } catch (e) {
            console.log(e)
            res.status(500).json({msg: 'failed'})
        }
    }
}

export default User
