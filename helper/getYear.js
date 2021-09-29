const getYear = () => {
    let toDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})
    return new Date(toDate).getFullYear()
}

export default getYear
