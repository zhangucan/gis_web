import '../utils/log'
import log4js from 'koa-log4'
export const router = app => {
  app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
}
