import api from '../api'
import xss from 'xss'
import R from 'ramda'
import mongoose from 'mongoose'

export async function getGridLayouts() {
  let info = {}
  try {
    const data = await api.gridLayout.getGridLayouts()
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

export async function getGridLayout(_id) {
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
    const data = await api.gridLayout.getGridLayout(_id)
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

export async function updateGridLayout(body) {
  const { _id } = body
  let info = {}
  if (!_id) {
    return (info = { code: 50000, msg: '_id不能为空' })
  }
  const gridLayout = {}
  gridLayout._id = _id
  gridLayout.title = xss(body.title)
  gridLayout.desc = xss(body.desc)
  gridLayout.map = body.map
  gridLayout.num = xss(body.num)
  gridLayout.gridItems = R.map(
    item => ({
      _id: typeof (item._id) === 'undefined' ? new mongoose.Types.ObjectId() : item._id,
      gridType: item.gridType,
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      component: item.component
    })
  )(body.gridItems)
  try {
    await api.gridLayout.updateGridLayout(gridLayout)
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

export async function delGridLayout(_id) {
  let info = {}
  if (!_id) {
    return (info = { code: 50000, msg: '_id不能为空' })
  }
  try {
    await api.gridLayout.delGridLayout(_id)
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

export async function saveGridLayout(body) {
  let info = {}
  const gridLayoutId = new mongoose.Types.ObjectId()
  body = {
    _id: gridLayoutId,
    title: xss(body.title),
    desc: xss(body.desc),
    num: xss(body.num),
    gridItems: R.map(
      item => ({
        _id: new mongoose.Types.ObjectId(),
        gridType: item.gridType,
        gridLayout: gridLayoutId,
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        component: item.component
      })
    )(body.gridItems)
  }
  try {
    const data = await api.gridLayout.saveGridLayout(body)
    info = {
      code: 20000,
      data: data
    }
  } catch (error) {
    info = {
      code: 50000,
      msg: error
    }
  }
  return info
}
