import axios from 'axios'
import getYear from '../../helper/getYear'

const fetchBot = async () => {
    try {
        const {data} = await axios.get(`https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=${getYear()}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-ibm-client-id': process.env.CLIENT_ID
            }
        })
        return data.result.data
    } catch (e) {

    }
}

export default fetchBot
