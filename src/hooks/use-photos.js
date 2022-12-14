import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/user'
import { getPhotos, getUserByUserId } from '../services/firebase'

const usePhotos = () => {
  const [photos, setPhotos] = useState()
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext)
  useEffect(() => {
    const getTimelinePhotos = async () => {
      const [{ following }] = await getUserByUserId(userId)
      let followedUserPhotos = []
      // does the user follow people
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following)
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
      setPhotos(followedUserPhotos)
    }
    getTimelinePhotos()
  }, [userId])
  return photos
}

export default usePhotos
