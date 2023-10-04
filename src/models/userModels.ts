import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    //   role for enum file
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'owner'],
    },
    forgotPassword: {
      type: String,
      default: '',
    },
    forgotPasswordExpire: {
      type: Date,
    },
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    verifyEmailToken: {
      type: String,
      default: '',
    },
    verifyTokenExpire: {
      type: Date,
    },
  },
  {
    timestamps: true, // automatically add createdAt and updatedAt
  }
)

const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel
