import firebase from 'firebase'

const firebaseConfig = JSON.parse(process.env.CREDENTIALS_FIREBASE)

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
} else {
    firebase.app()
}

const database = firebase.database()

export default database
