'use client'
import Link from 'next/link'
import React, { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  })
  const [loading, setLoading] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      setLoading(true)
      // Make a POST request to your signup API endpoint with the user data
      console.log('Signup user:', user)
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup response:', response)

      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        console.log('Signup success', response.data)
        // Redirect the user to the login page after successful signup
        router.push('/login')
      } else {
        console.log('Signup failed. Status:', response.status)
      }
    } catch (error: any) {
      console.log('Signup failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <form className='w-1/3 flex flex-col border-white border-4 p-8 rounded-3xl '>
        {/* Display "Processing" or "Signup" based on loading state */}
        <h1 className='text-4xl font-bold'>{loading ? 'Processing' : 'Signup'}</h1>
        <hr className='my-4' />
        {/* Labels and input fields for username, email, and password */}
        <label htmlFor='username' className='text-white dark:text-gray-300 mb-2'>
          Username
        </label>
        <input
          className='p-2 border placeholder:text-right border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white'
          id='username'
          type='text'
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='unique username'
        />

        <label htmlFor='email' className='text-white dark:text-gray-300 mb-2'>
          Email
        </label>
        <input
          className='p-2 border border-gray-300 rounded-lg mb-4 placeholder:text-right focus:outline-none focus:border-gray-600 text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white'
          id='email'
          type='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='example@email.com'
        />

        <label htmlFor='password' className='text-white text dark:text-gray-300'>
          Password
        </label>
        <input
          className='p-2 border border-gray-300 placeholder:text-right rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white'
          id='password'
          type='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='uppercase, lowercase, number, symbol'
        />

        {/* Signup button */}
        <button
          onClick={onSignup}
          className='p-2 border w-1/3 mx-auto border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white'
        >
          {buttonDisabled ? 'Enter your information' : 'Signup'}
        </button>

        {/* Link to the login page */}
        <Link href='/login' className='text-center'>
          Visit <span className='underline text-blue-500'> login page </span>
        </Link>
      </form>
    </div>
  )
}
