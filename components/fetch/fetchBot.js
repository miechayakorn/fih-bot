import axios from 'axios'

const fetchBot = async (year) => {
    try {
        const {data} = await axios.get(`https://apigw1.bot.or.th/bot/public/financial-institutions-holidays/?year=${year}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-ibm-client-id': process.env.CLIENT_ID
            }
        })
        return data?.result?.data
    } catch (e) {
        console.error(e)
    }
}

export default fetchBot
