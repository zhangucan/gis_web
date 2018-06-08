import mongoose from 'mongoose'
const VectorFeatures = mongoose.model('VectorFeatures')
const Map = mongoose.model('Map')

export async function saveMap(data) {
  const vectorFeatures = await VectorFeatures.create(data.vectorLayers)
  data.vectorLayers = vectorFeatures
  const map = await Map.create(data)
  return map
}

export async function getMaps() {
  const maps = await Map.find({}).populate({
    path: 'vectorLayers',
    select: '_id type displayTime'
  }).exec()
  return maps
}

export async function getMap(id) {
  const map = await Map.findOne({ _id: id }).populate({
    path: 'vectorLayers',
    select: '_id type displayTime featurecollection'
  }).exec()
  return map
}

export async function updateMap(data) {
  await VectorFeatures.deleteMany({ map: data._id }).exec()
  const vectorFeatures = await VectorFeatures.create(data.vectorLayers)
  data.vectorLayers = vectorFeatures
  const map = await Map.updateOne({ _id: data._id }, data).exec()
  return map
}

export async function delMap(id) {
  await Map.deleteOne({ _id: id }).exec()
  await VectorFeatures.deleteMany({ map: id }).exec()
  return true
}
