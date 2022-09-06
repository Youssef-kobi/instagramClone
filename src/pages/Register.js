import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as PATHS from '../constants/routes'
import { doesUsernameExist } from '../services/firebase'

const Register = () => {
  const Navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext)
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalid =
    password === '' || emailAddress === '' || username === '' || fullName === ''

  const handleSignUp = async (event) => {
    event.preventDefault()
    // console.log(emailAddress, password)

    const usernameExist = await doesUsernameExist(username)
    if (!usernameExist)
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password)

        // join created user profile
        await createdUserResult.user.updateProfile({
          displayName: username,
        })

        // create a doc in firebase firestore
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLocaleLowerCase(),
          fullName,
          emailAddress: emailAddress.toLocaleLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        })
        // Auth
        // -> emailAddress , password, username,
        Navigate(PATHS.DASHBOARD)
        // console.log('Done')
      } catch (Error) {
        setFullName('')
        setEmailAddress('')
        setPassword('')
        setError(Error.message)
      }
    else {
      setUsername('')
      setError('that username already exist')
    }
  }
  useEffect(() => {
    document.title = 'Register - Instagram'
  }, [])

  return (
    <div className='container flex items-center mx-auto max-w-screen-md h-screen '>
      <div className='flex w-3/5'>
        <img
          src='/images/iphone-with-profile.jpg'
          alt='iphone with Instagram app'
        />
      </div>
      <div className='flex flex-col w-2/5'>
        <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
          <h1 className='flex justify-center w-full'>
            <img
              src='/images/logo.png'
              alt='Instagram'
              className='mt-2 mb-4 w-6/12 '
            />
          </h1>

          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

          <form onSubmit={handleSignUp} method='POST'>
            <input
              aria-label='Enter your username'
              type='text'
              placeholder='Username'
              onChange={({ target }) => setUsername(target.value)}
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              value={username}
            />
            <input
              aria-label='Enter your full name'
              type='text'
              placeholder='Full name'
              onChange={({ target }) => setFullName(target.value)}
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              value={fullName}
            />
            <input
              aria-label='Enter your email address'
              type='text'
              placeholder='Email address'
              onChange={({ target }) => setEmailAddress(target.value)}
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              value={emailAddress}
            />
            <input
              aria-label='Enter your password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            />
            <button
              type='submit'
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold             ${
                isInvalid && `opacity-50`
              }  
          `}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
          <p className='text-sm'>
            have an account?{' '}
            <Link to={PATHS.LOGIN} className='font-bold text-blue-medium'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
