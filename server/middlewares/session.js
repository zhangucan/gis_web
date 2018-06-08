import Session from 'koa-session2'
import { redisStore } from '../utils/store'
export const session = app => {
  app.use(Session({
    key: 'sessionId',
    httpOnly: false,
    store: redisStore // 添加 store 配置项
  }))
}
