const mongoose = require('mongoose')
const GridLayoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: String,
  num: {
    type: Number,
    required: true
  },
  map: { type: mongoose.Schema.Types.ObjectId, ref: 'Map' },
  gridItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GridItem' }],
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
mongoose.model('GridLayout', GridLayoutSchema)
