const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String
  },
  gridLayouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GridLayout' }],
  password: {
    type: String,
    required: true
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

mongoose.model('User', UserSchema)
