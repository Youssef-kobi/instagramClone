import { FieldValue, firebase } from '../lib/firebase'

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get()
  return result.docs.length > 0
}

export const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()
  // console.log(result)
  // const user = { ...result.docs[0].data(), docId: result.docs[0].id }
  // without mapping as there wont be two user with the same uid
  const user = result.docs.map((item) => {
    return { ...item.data(), docId: item.id }
  })
  return user
}

export const getSuggestedProfiles = async (userId, following) => {
  let query = await firebase.firestore().collection('users')
  query =
    (await following.length) > 0
      ? query.where('userId', 'not-in', [...following, userId])
      : query.where('userId', '!=', userId)
  const result = await query.limit(10).get()
  const profiles = result.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
  // const profiles = result.docs
  //   .map((doc) => ({ ...doc.data(), docId: doc.id }))
  //   .filter(
  //     (profile) =>
  //       profile.userId !== userId && !following.includes(profile.userId)
  //   )
  // console.log(result)
  return profiles
}

export const updateLoggedInUserFollowing = async (
  LoggedInUserDocId,
  profileId,
  isFollowingProfile
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(LoggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    })
}

export const updateFollowedUserFollowers = async (
  SuggestedProfileDocId,
  userId,
  isFollowingProfile
) => {
  return firebase
    .firestore()
    .collection('users')
    .doc(SuggestedProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    })
}

export const getPhotos = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get()
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }))

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true
      }
      const user = await getUserByUserId(photo.userId)
      const { username } = user[0]
      return { username, ...photo, userLikedPhoto }
    })
  )
  return photosWithUserDetails
}

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get()

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))
}

export const getUserPhotosByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get()

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }))
  return photos
}

export const isUserFollowingProfile = async (
  LoggedInUserUsername,
  profileUserId
) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', LoggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get()
  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))
  return response.userId
}

export const toggleFollow = async (
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) => {
  // 1st param: Me's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile?
  // e.g. does Me follow raphael? (true/false)
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  )
  // 1st param: Me's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile?
  // e.g. does Me follow raphael? (true/false)
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  )
}
