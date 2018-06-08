import mongoose from 'mongoose'
const User = mongoose.model('User')

export async function saveUser(data) {
  const user = await User.create(data)
  return user
}

export async function getUsers() {
  const users = await User.find({}).populate({
    path: 'gridLayouts',
    select: '_id title desc'
  }).exec()
  return users
}

export async function isExist(query) {
  return await User.where('name').equals(query)
}

export async function getUser(id) {
  const map = await User.findOne({ _id: id }).populate({
    path: 'gridLayouts',
    select: '_id title desc map',
    populate: [{
      path: 'map',
      select: '_id lon lat'
    }]
  }).exec()
  return map
}

export async function getUserDetail(id) {
  const map = await User.findOne({ _id: id }).populate({
    path: 'gridLayouts',
    select: '_id title desc gridItems map',
    populate: [{
      path: 'gridItems',
      select: '_id i x y w h component'
    },
    {
      path: 'map',
      select: '_id lon lat'
    }]
  }).exec()
  return map
}

export async function updateUser(data) {
  const user = await User.updateOne({ _id: data._id }, data).exec()
  return user
}

export async function delUser(id) {
  await User.deleteOne({ _id: id }).exec()
  return true
}
