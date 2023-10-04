import getDataFromToken from '@/helpers/getDataFromToken'
import { NextRequest, NextResponse } from 'next/server'
import connectdb from '@/db/dbConfig'
import userModel from '@/models/userModels'

connectdb()

export async function GET(request: NextRequest) {
  try {
    console.log('me route reached')
    const data = await getDataFromToken(request)
    console.log(data)
    const user = await userModel
      .findById(data)
      .select(
        '-password -forgotPassword -verifyEmail -verifyEmailToken  -verifyEmailTokenExpires'
      )
    console.log(user)
    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
