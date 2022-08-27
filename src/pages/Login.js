/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FirebaseContext from '../context/firebase'

const Login = () => {
  const Navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext)
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalid = password === '' || emailAddress === ''

  const handleLogin = () => {}
  useEffect(() => {
    document.title = 'Login - Instagram'
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

          <form onSubmit={handleLogin} method='POST'>
            <input
              aria-label='Enter your email address'
              type='text'
              placeholder='Email address'
              onChange={(target) => setEmailAddress(target.value)}
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
            />
            <input
              aria-label='Enter your password'
              type='password'
              placeholder='Password'
              onChange={(target) => setPassword(target.value)}
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
              Log in
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
          <p className='text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='font-bold text-blue-medium'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
