import Redis from 'ioredis'
import config from '../config'
const { Store } = require('koa-session2')

class RedisStore extends Store {
  constructor() {
    super()
    this.redis = new Redis(config.redis)   // 默认 127.0.0.1 6379端口
  }
  async get(sid, ctx) {  // 实现get方法
    const data = await this.redis.get(`SESSION:${sid}`)
    return JSON.parse(data)
  }
  async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
    try {
        // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', 5000)
    } catch (e) {
      console.log(e)
    }
    return sid
  }
  async setUser2Session(userId, sid) {
    await this.redis.hset('UESR2SESSION', userId, sid)
  }
  async getUser2Session(userId) {
    return await this.redis.hget('UESR2SESSION', userId)
  }
  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`)
  }
}
const redisStore = new RedisStore()
export { redisStore }
