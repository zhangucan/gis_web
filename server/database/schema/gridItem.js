const mongoose = require('mongoose')
const GridItemSchema = new mongoose.Schema({
  i: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  w: {
    type: Number,
    required: true
  },
  h: {
    type: Number,
    required: true
  },
  component: mongoose.Schema.Types.Mixed,
  gridType: {
    type: String,
    required: true
  },
  gridLayout: {
    type: mongoose.Schema.ObjectId,
    ref: 'GridLayout'
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
mongoose.model('GridItem', GridItemSchema)
