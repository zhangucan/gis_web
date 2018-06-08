import mongoose from 'mongoose'
const VectorFeatures = mongoose.model('VectorFeatures')
const Map = mongoose.model('Map')
export async function saveVectorFeatures(data) {
  if (data._id) {
    await VectorFeatures.remove({ _id: data._id })
  }
  var type = data.vectorFeatures.type.toLowerCase()
  data[type] = data.vectorFeatures
  data.featureType = type
  const vectorFeatures = new VectorFeatures(data)
  return new Promise((resolve, reject) => {
    vectorFeatures.save((err, obj) => {
      if (err) return reject(err)
      return resolve(obj)
    })
  })
}
export async function fetchVectorFeatures(query) {
  return new Promise((resolve, reject) => {
    VectorFeatures.find(query, (error, data) => {
      if (error) return reject(error)
      if (data) {
        return resolve(data)
      } else {
        return reject()
      }
    })
  })
}

export async function fetchMapList(query) {
  return new Promise((resolve, reject) => {
    Map.find(query, (error, data) => {
      if (error) return reject(error)
      if (data) {
        return resolve(data)
      } else {
        return reject(error)
      }
    })
  })
}
export async function fetchMap2(query, fields) {
  const map = await Map.findOne(query, fields).exec()
  return new Promise((resolve, reject) => {
    if (map) {
      resolve(map)
    } else {
      reject()
    }
  })
}
export async function fetchMap(query, fields) {
  const map = await Map.findOne(query, fields).exec()
  let vectorFeatures = []
  if (map) {
    vectorFeatures = await fetchVectorFeatures({ mapId: map._id })
  }
  map.vectorFeatures = vectorFeatures
  return new Promise((resolve, reject) => {
    if (map) {
      resolve(map)
    } else {
      reject()
    }
  })
}

export async function saveMap(data) {
  let map = null
  if (data._id) {
    map = await fetchMap({ _id: data._id })
    await VectorFeatures.remove({ mapId: data._id })
  }
  if (map) {
    map.title = data.title
    map.rasterLayers = data.rasterLayers
    map.lon = data.lon
    map.lat = data.lat
    map.desc = data.desc
  } else {
    map = new Map({
      title: data.title,
      lon: data.lon,
      lat: data.lat,
      desc: data.desc,
      rasterLayers: data.rasterLayers
    })
  }
  return new Promise((resolve, reject) => {
    map.save((err, obj) => {
      if (err) return reject(err)
      data.vectorFeatures.forEach(async item => {
        item.mapId = obj._id
        await saveVectorFeatures(item)
      })
      return resolve(obj._id)
    })
  })
}
