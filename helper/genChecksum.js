import jsum from 'jsum'

const genChecksum = (dataBOTs) => {
    return jsum.digest(JSON.stringify(dataBOTs), 'SHA256', 'hex')
}

export default genChecksum
