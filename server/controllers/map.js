import api from '../api'
import xss from 'xss'
import R from 'ramda'
import mongoose from 'mongoose'

export async function getMaps() {
  let info = {}
  try {
    const data = await api.map.getMaps()
    info = {
      data: data,
      code: 20000
    }
  } catch (error) {
    info = {
      code: 50000,
      msg: error
    }
  }
  return info
}

export async function getMap(_id) {
  let info = {}
  if (!_id) {
    return (
      info = {
        code: 50000,
        msg: 'ID 不存在'
      }
    )
  }
  try {
    const data = await api.map.getMap(_id)
    info = {
      data: data,
      code: 20000
    }
  } catch (error) {
    info = {
      code: 50000,
      msg: error
    }
  }
  return info
}

export async function updateMap(body) {
  const { _id } = body
  let info = {}
  if (!_id) {
    return (info = { code: 50000, msg: '_id不能为空' })
  }
  const map = {}
  map._id = _id
  map.title = xss(body.title)
  map.desc = xss(body.desc)
  map.lon = xss(body.lon)
  map.lat = xss(body.lat)
  map.rasterLayers = R.map(
    item => ({
      displayTime: xss(item.displayTime),
      address: xss(item.address),
      _id: new mongoose.Types.ObjectId()
    })
  )(body.rasterLayers)
  map.vectorLayers = R.map(
    item => ({
      _id: new mongoose.Types.ObjectId(),
      displayTime: xss(item.displayTime),
      type: xss(item.type.toLowerCase()),
      featurecollection: item.featurecollection,
      map: _id
    })
  )(body.vectorLayers)
  try {
    info = {
      code: 20000,
      data: await api.map.updateMap(map)
    }
  } catch (error) {
    info = {
      code: 50000,
      msg: error
    }
  }
  return info
}

export async function delMap(_id) {
  let info = {}
  if (!_id) {
    return (info = { code: 50000, msg: '_id不能为空' })
  }
  try {
    await api.map.delMap(_id)
    info = {
      code: 20000
    }
  } catch (error) {
    info = {
      code: 50000,
      msg: error
    }
  }
  return info
}

export async function saveMap(body) {
  let info = {}
  const mapId = new mongoose.Types.ObjectId()
  body = {
    _id: mapId,
    title: xss(body.title),
    desc: xss(body.desc),
    lon: xss(body.lon),
    lat: xss(body.lat),
    rasterLayers: R.map(
      item => ({
        displayTime: xss(item.displayTime),
        address: xss(item.address),
        _id: new mongoose.Types.ObjectId()
      })
    )(body.rasterLayers),
    vectorLayers: R.map(
      item => ({
        _id: new mongoose.Types.ObjectId(),
        displayTime: xss(item.displayTime),
        type: xss(item.type.toLowerCase()),
        featurecollection: item.featurecollection,
        map: mapId
      })
    )(body.vectorLayers)
  }
  try {
    await api.map.saveMap(body)
    info = {
      code: 20000
    }
  } catch (error) {
    info = {
      code: 50000,
      msg: error
    }
  }
  return info
}
