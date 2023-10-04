// Import any necessary dependencies for your server action
import { NextRequest, NextResponse } from 'next/server'
import connectdb from '@/db/dbConfig'
import userModel from '@/models/userModels'
import bcryptjs from 'bcryptjs'

connectdb()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    console.log(reqBody)
    //check if user already exists
    const user = await userModel.findOne({ email })
    if (user) {
      console.log(user)
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hashing password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    })
    console.log(newUser)
    const savedUser = await newUser.save()
    console.log(savedUser)

    //send verification email

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
