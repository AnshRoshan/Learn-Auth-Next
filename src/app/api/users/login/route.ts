import { NextRequest, NextResponse } from 'next/server'
import connectdb from '@/db/dbConfig'
import userModel from '@/models/userModels'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connectdb()

export async function POST(request: NextRequest) {
  //login user
  try {
    const reqBody = await request.json()
    const { email, username, password } = reqBody
    console.log(reqBody)

    if (!email || !password) {
      return NextResponse.json({ error: 'Please fill all fields' }, { status: 400 })
    }

    //check if user  exists
    const user = await userModel.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 })
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    // jsonwebtoken data
    const jwtData = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    }

    // creating a token
    const token = await jwt.sign(jwtData, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({
      message: 'User logged in successfully',
      success: true,
      username: user.username,
      token,
    })
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
