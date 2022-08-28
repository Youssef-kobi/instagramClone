import { firebase } from '../lib/firebase'

const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get()
  return result.docs.length > 0
}

export default doesUsernameExist
