import mongoose from 'mongoose'
const GridItem = mongoose.model('GridItem')

export async function saveGridItem(data) {
  return await GridItem.create(data)
}

export async function updateGridItem(data) {
  await GridItem.updateOne({ _id: data._id }, data, { upsert: true }).exec()
}

export async function delGridItems(query) {
  await GridItem.deleteMany(query).exec()
}

export async function delGridItem(query) {
  await GridItem.deleteOne(query).exec()
}
