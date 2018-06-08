import mongoose from 'mongoose'
import * as gridItem from './gridItem'
import _ from 'lodash'
const GridLayout = mongoose.model('GridLayout')

export async function saveGridLayout(data) {
  const temp = await gridItem.saveGridItem(data.gridItems)
  data.gridItems = temp
  const gridLayout = await GridLayout.create(data)
  return gridLayout
}

export async function getGridLayouts() {
  const gridLayouts = await GridLayout.find({}).populate([{
    path: 'gridItems',
    select: '_id i x y w h gridType'
  }, {
    path: 'map',
    select: '_id title lon lat desc'
  }]).exec()
  return gridLayouts
}

export async function getGridLayout(id) {
  const gridLayout = await GridLayout.findOne({ _id: id }).populate([{
    path: 'gridItems',
    select: '_id i x y w h gridType component'
  }, {
    path: 'map',
    select: '_id title lon lat desc'
  }]).exec()
  return gridLayout
}

export async function updateGridLayout(data) {
  _.forEach(data.gridItems, await gridItem.updateGridItem)
  const gridLayout = await GridLayout.updateOne({ _id: data._id }, data).exec()
  return gridLayout
}

export async function delGridLayout(id) {
  await GridLayout.deleteOne({ _id: id }).exec()
  await gridItem.delGridItems({ gridLayout: id })
  return true
}
