import Firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// import { seedDatabase } from '../seed'
const config = {
  apiKey: 'AIzaSyACh09sD90qjYBPGYujVHXTedoOoi0IP-w',
  authDomain: 'instagramclone-645d6.firebaseapp.com',
  projectId: 'instagramclone-645d6',
  storageBucket: 'instagramclone-645d6.appspot.com',
  messagingSenderId: '28854874679',
  appId: '1:28854874679:web:e44d5d107cc3b1674b45b2',
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore
// call seed file once here =>
// seedDatabase(firebase)

export { firebase, FieldValue }
