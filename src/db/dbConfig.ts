import mongoose from 'mongoose'

async function connectdb() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log(`Database connected: ${connection.name}`)
    })

    connection.on('error', (error) => {
      console.log(`Database connection error: ${error}`)
      process.exit()
    })

    connection.on('disconnected', () => {
      console.log('Database disconnected')
    })
  } catch (error: any) {
    console.log('Error connecting to the database:', error.message)
  }
}

export default connectdb
