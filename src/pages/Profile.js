import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import * as PATHS from '../constants/routes'
import { getUserByUsername } from '../services/firebase'
import UserProfile from '../components/Profile/UserProfile'

const Profile = () => {
  const { username } = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const Navigate = useNavigate()
  useEffect(() => {
    const checkUserExists = async () => {
      const [User] = await getUserByUsername(username)
      if (User?.userId) {
        setUserProfile(User)
      } else {
        Navigate(PATHS.NOTFOUND)
      }
    }

    checkUserExists()
  }, [username, Navigate])

  return userProfile?.username ? (
    <div className='bg-gray-background'>
      <Header />
      <div className='mx-auto max-w-screen-lg'>
        <UserProfile userProfile={userProfile} />
      </div>
    </div>
  ) : null
}

export default Profile
