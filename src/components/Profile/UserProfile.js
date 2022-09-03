/* eslint-disable react/forbid-prop-types */
import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Photos from './Photos'
import { getUserPhotosByUserId } from '../../services/firebase'

const UserProfile = ({ userProfile }) => {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
    followingCount: 0,
  }
  const [
    { profile, photosCollection, followerCount, followingCount },
    dispatch,
  ] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(userProfile.userId)
      dispatch({
        profile: userProfile,
        photosCollection: photos,
        followerCount: userProfile.followers.length,
        followingCount: userProfile.following.length,
      })
    }
    getProfileInfoAndPhotos()
  }, [userProfile.username])

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        followingCount={followingCount}
      />
      <Photos photos={photosCollection} />
    </>
  )
}
export default UserProfile

UserProfile.propTypes = {
  userProfile: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
}
