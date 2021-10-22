import firebase from '../../helper/firebase'

export const fetchFirebase = async (findVar) => {
    const conn = firebase.ref(findVar)

    let response
    await conn.on('value', snapshot => {
        response = snapshot.val()
    })
    return response
}

export const storeFirebase = async (findVar, data) => {
    const conn = firebase.ref(findVar)
    await conn.set(data)
}
