import NodeRSA from 'node-rsa'
import * as userApi from '../api/user.js'
import config from '../config/index'
import log4js from 'koa-log4'
import { redisStore } from '../utils/store'
const private_key = new NodeRSA(config.private_key)
private_key.setOptions({ encryptionScheme: 'pkcs1' })
export async function userLogin(ctx, next) {
  const msg = {
    data: {
      token: ''
    },
    message: '',
    code: ''
  }
  const data = ctx.request.body
  var decrypted = private_key.decrypt(data.password, 'utf8')
  const user = {
    name: data.username
  }

  try {
    const flag = await userApi.userExis(data.username)
    if (flag.length > 0) {
      const userInfo = await userApi.useLogin(user)
      if (userInfo.password === decrypted) {
        ctx.session.user = userInfo
        const sid = ctx.cookies.get('sessionId')
        msg.data.token = sid
        const sid_old = await redisStore.getUser2Session(userInfo._id)
        if (sid_old) await redisStore.destroy(sid_old, ctx)
        await redisStore.setUser2Session(userInfo._id, sid)
        msg.code = 20000
      } else {
        msg.code = 50000
        msg.message = '密码错误'
      }
    } else {
      msg.code = 50000
      msg.message = '用户名错误'
    }
  } catch (error) {
    msg.message = error
    msg.code = 50008
  }
  ctx.body = msg
}
const logger = log4js.getLogger('option')
export async function requestMiddle(ctx, next) {
  const re = /^\/user\/(login|logout|rsakey)$/gi
  if (re.test(ctx.url)) {
    await next()
  } else {
    if (ctx.cookies.get('sessionId')) {
      const sessionId = ctx.cookies.get('sessionId')
      const userInfo = await redisStore.get(sessionId, ctx)
      const info = {
        name: userInfo.user.name,
        date: new Date(),
        option: ctx.path
      }
      if (userInfo) {
        logger.info(JSON.stringify(info))
        redisStore.set(userInfo, { sid: sessionId }, ctx)
        await next()
      } else {
        ctx.body = {
          code: 50008
        }
      }
    } else {
      ctx.body = {
        code: 50000
      }
    }
  }
}
export async function userInfo(ctx, next) {
  const useInfo = await redisStore.get(ctx.cookies.get('sessionId'), ctx)
  ctx.body = {
    code: 20000,
    data: {
      name: useInfo.user.name,
      roles: useInfo.user.roles,
      gridLayouts: useInfo.user.gridLayouts
    }
  }
}
export async function userLogout(ctx, next) {
  const sessionId = ctx.cookies.get('sessionId')
  await redisStore.destroy(sessionId, ctx)
  ctx.body = {
    code: 20000
  }
}
export function getRSAKey(ctx, next) {
  ctx.body = {
    key: config.public_key,
    code: 20000
  }
}
export async function userList(ctx, next) {
  const msg = {
    data: {
      token: ''
    },
    message: '',
    code: ''
  }
  try {
    const userList = await userApi.userList()
    msg.data = userList
    msg.code = 20000
  } catch (error) {
    msg.error = error
    msg.code = 50000
  }
  ctx.body = msg
}
export async function saveUser(ctx, next) {
  const data = ctx.request.body
  try {
    await userApi.saveUser(data)
    ctx.body = {
      code: 20000
    }
  } catch (error) {
    ctx.body = {
      code: 50000,
      message: '用户名已被注册'
    }
  }
}
export async function updateUser(ctx, next) {
  const data = ctx.request.body
  try {
    await userApi.updateUser(data)
    ctx.body = {
      code: 20000
    }
  } catch (error) {
    ctx.body = {
      code: 50000,
      message: '未知错误'
    }
  }
}
