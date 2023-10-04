'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
interface User {
  _id: string
  username: string
  email: string
  [key: string]: any // add this
}
function UserProfile() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null) // add type here
  const router = useRouter()

  useEffect(() => {
    getUserDetails()
  }, [])
  const getUserDetails = async () => {
    console.log('getUserDetails')
    const response = await axios.get('/api/users/me')
    console.log(response.data.user)
    setUser(response.data.user)
  }

  const onLogout = async () => {
    try {
      setLoading(true)
      await axios.get('/api/users/logout')
      router.push('/')
    } catch (error: any) {
      console.error('Logout failed', error.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1 className='text-3xl text-center capitalize p-2'>Profile Page</h1>
      <hr className='my-2' />
      {user && (
        <Link href='/profile/[id]' as={`/profile/${user._id}`} className='text-center p-8'>
          <p>You are {user.username}</p>
          <p>Your current email logged into is {user.email}</p>
          <p>Your user id is {user._id}</p>
          <p>Your permissiable role is {user.role}</p>
          <p>Joining Time:--- {user.createdAt}</p>
          <p>Updation Time:--- {user.updatedAt}</p>
        </Link>
      )}
      <button
        onClick={getUserDetails}
        className='mx-3 bg-purple-600 hover:bg-purple-700 p-3 rounded-box'
      >
        Get User Details
      </button>

      <button
        onClick={onLogout}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        {loading ? 'Processing' : 'Logout'}
      </button>
    </div>
  )
}
export default UserProfile
