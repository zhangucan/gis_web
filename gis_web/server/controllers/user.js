import api from '../api'
import xss from 'xss'
import R from 'ramda'
import mongoose from 'mongoose'

import NodeRSA from 'node-rsa'
import config from '../config/index'
import { redisStore } from '../utils/store'

const private_key = new NodeRSA(config.private_key)
private_key.setOptions({ encryptionScheme: 'pkcs1' })

export async function getUsers() {
  let info = {}
  try {
    const data = await api.user.getUsers()
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
export function getRSAKey() {
  return {
    key: config.public_key,
    code: 20000
  }
}
export async function login(ctx) {
  const body = ctx.request.body
  let info = {}
  const decrypted = private_key.decrypt(xss(body.password), 'utf8')
  const flag = await api.user.isExist(body.username)
  if (flag.length === 0) {
    return (
      info = {
        code: 50000,
        msg: '用户不存在'
      }
    )
  }
  try {
    const userInfo = await api.user.getUser(flag[0]._id)
    if (userInfo.password === decrypted) {
      ctx.session.user = userInfo
      const sid = ctx.cookies.get('sessionId')
      info = {
        data: {
          token: sid,
          _id: userInfo._id
        },
        code: 20000
      }
      const sid_old = await redisStore.getUser2Session(userInfo._id)
      if (sid_old) await redisStore.destroy(sid_old, ctx)
      await redisStore.setUser2Session(userInfo._id, sid)
    } else {
      return (
        info = {
          code: 50000,
          msg: '密码错误'
        }
      )
    }
  } catch (error) {
    return (
      info = {
        code: 50000,
        msg: error
      }
    )
  }
  return info
}

export async function getUserDetail(_id) {
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
    const data = await api.user.getUserDetail(_id)
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
export async function getUser(_id) {
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
    const data = await api.user.getUser(_id)
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

export async function updateUser(body) {
  const { _id } = body
  let info = {}
  if (!_id) {
    return (info = { code: 50000, msg: '_id不能为空' })
  }
  const user = {}
  user._id = _id
  user.title = xss(body.title)
  user.role = xss(body.role)
  user.password = xss(body.password)
  user.name = xss(body.name)
  R.map(
    item => ({
      _id: item._id
    })
  )(body.gridLayouts)
  user.gridLayouts = body.gridLayouts
  try {
    info = {
      code: 20000,
      data: await api.user.updateUser(user)
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

export async function saveUser(body) {
  let info = {}
  const userId = new mongoose.Types.ObjectId()
  body = {
    _id: userId,
    name: xss(body.name),
    password: xss(body.password),
    role: xss(body.role),
    gridLayouts: body.gridLayouts
  }
  try {
    await api.user.saveUser(body)
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
export async function userLogout(ctx) {
  const sessionId = ctx.cookies.get('sessionId')
  await redisStore.destroy(sessionId, ctx)
  ctx.body = {
    code: 20000
  }
}
