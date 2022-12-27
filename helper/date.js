export const getYear = () => {
    let toDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})
    console.log(toDate)
    return new Date(toDate).getFullYear()
}

export const getMonth = () => {
    let toDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})
    return new Date(toDate).getMonth()
}
