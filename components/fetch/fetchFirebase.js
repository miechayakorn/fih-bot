import firebase from '../../helper/firebase'

export const fetchFirebase = async (findVar) => {
    return await (new Promise((resolve) => {
        firebase.ref(findVar).on('value', snapshot => {
            resolve(snapshot.val())
        })
    }))
}

export const storeFirebase = async (findVar, data) => {
    const conn = firebase.ref(findVar)
    await conn.set(data)
}
