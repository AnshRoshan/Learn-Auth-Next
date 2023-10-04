'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const onLogin = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)

      // Send a POST request to the login API route with the user's email and password
      const response = await axios.post('/api/users/login', user)

      console.log('Login success', response.data)
      // Redirect the user to the dashboard or another page upon successful login
      router.push(`/profile/${response.data.username}`)
    } catch (error: any) {
      console.error('Login failed', error.message)
      // You can handle login errors here, such as displaying an error message to the user
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <form className='w-1/3 flex flex-col border-white border-4 p-8 rounded-3xl '>
        <h1 className='text-4xl text-center font-bold'>{loading ? 'Processing' : 'Login'}</h1>
        <hr className='my-4' />

        {/* Email input field */}
        <div className='flex flex-col mt-2'>
          <label htmlFor='email' className='text-white dark:text-gray-300 mb-2'>
            Email
          </label>
          <input
            className='p-2 border w-full border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            id='email'
            type='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder='Email'
          />
        </div>

        <label htmlFor='password'>Password</label>
        <input
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
          id='password'
          type='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='Password'
        />

        <button
          onClick={onLogin}
          type='submit'
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
          Login
        </button>

        <Link href='/signup'>
          Don't have an account?<span className='underline text-blue-500'> Signup </span>
        </Link>
      </form>
    </div>
  )
}
