import mongoose from 'mongoose'
const User = mongoose.model('User')
export function useLogin(obj) {
  return new Promise((resolve, reject) => {
    User.findOne(obj, (err, data) => {
      if (err) reject(err)
      if (data) {
        resolve(data)
      }
    })
  })
}
export async function userExis(query) {
  return await User.where('name').equals(query)
}
export function userList() {
  return new Promise((resolve, reject) => {
    User.find({}, (err, data) => {
      if (err) reject(err)
      if (data) {
        resolve(data)
      }
    })
  })
}
export function saveUser(data) {
  return new Promise((resolve, reject) => {
    const user = new User(data)
    user.save((err, data) => {
      if (err) reject(err)
      if (data) {
        resolve(data)
      }
    })
  })
}
export function updateUser(data) {
  return new Promise((resolve, reject) => {
    const user = {}
    user.password = data.password
    user.role = data.role
    user.gridLayouts = data.gridLayouts
    User.updateOne({ _id: data._id }, user, (err, obj) => {
      if (err) return reject(err)
      return resolve(obj._id)
    })
  })
}

