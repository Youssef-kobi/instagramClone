import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/user'
import { getUserByUserId } from '../services/firebase'

const useUser = () => {
  const [activeUser, setActiveUser] = useState({})
  const { user } = useContext(UserContext)
  useEffect(() => {
    const getUserObjByUserId = async () => {
      // get user data from firebase
      const [response] = await getUserByUserId(user.uid)
      setActiveUser(response)
    }
    if (user?.uid) getUserObjByUserId()
  }, [user.uid])
  return { user: activeUser }
}

export default useUser
