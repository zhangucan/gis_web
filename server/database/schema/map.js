const mongoose = require('mongoose')
const MapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rasterLayers: [],
  vectorLayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VectorFeatures' }],
  lon: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  desc: {
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
MapSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
mongoose.model('Map', MapSchema)

