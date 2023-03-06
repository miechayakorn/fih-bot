import fetchBot from '../../../../components/fetch/fetchBot'

const realBot = async (req, res) => {
    const {year} = req.query
    if (!year) {
        res.status(400).json({msg: "year must not be null"})
    }
    const dataBOTs = await fetchBot(year)
    res.status(201).json({ year, length: dataBOTs?.length, dataBOTs})
}

export default realBot
