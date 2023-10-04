'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  _id: string
  username: string
  email: string
  [key: string]: any // add this
}
function UserProfile({ params }: any) {
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
      <h1 className='text-3xl text-center capitalize p-2'>{user?.username}</h1>
      <hr className='my-2' />
      {user && (
        <div className='flex justify-evenly m-4 h-64  overflow-hidden items-center border-2 rounded-box border-white/30'>
          <img
            src='https://picsum.photos/900/200 '
            className='w-1/2 p-4 rounded-3xl inline-block'
            alt='random image'
          />
          <div className='p-8 w-1/2'>
            <p>You are {user.username}</p>
            <p>Your current email logged into is {user.email}</p>
            <p>Your user id is {user._id}</p>
            <p>Your permissiable role is {user.role}</p>
            <p>Joining Time:--- [{user.createdAt}]</p>
            <p>Updation Time:--- [{user.updatedAt}]</p>
          </div>
        </div>
      )}
      <div className='flex justify-center'>
        <button
          onClick={onLogout}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-box'
        >
          {loading ? 'Processing' : 'Logout'}
        </button>
      </div>
    </div>
  )
}
export default UserProfile
