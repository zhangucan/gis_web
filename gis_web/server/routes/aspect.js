import { controller, all } from '../decorator/router'
import log4js from 'koa-log4'
import { redisStore } from '../utils/store'

const logger = log4js.getLogger('option')
@controller('/*')
export class GridLayoutController {
  @all('/*')
  async getGridLayouts(ctx, next) {
    const re = /^\/user\/(login|logout|pubkey)$/gi
    if (re.test(ctx.url)) {
      return await next()
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
          msg: 'session 过期',
          code: 50000
        }
      }
    }
  }
}
