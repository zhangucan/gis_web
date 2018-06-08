import { controller, get, post, put, del } from '../decorator/router'
import { redisStore } from '../utils/store'
import service from '../controllers'
@controller('/user')
export class UserController {
  @get('/users')
  async getUsers(ctx, next) {
    ctx.body = await service.user.getUsers()
  }
  @get('/users/:_id')
  async getUser(ctx, next) {
    const { params } = ctx
    const { _id } = params
    const data = await service.user.getUser(_id)
    ctx.body = data
  }
  @get('/info')
  async getUserInfo(ctx, next) {
    const useInfo = await redisStore.get(ctx.cookies.get('sessionId'), ctx)
    const { _id } = useInfo.user
    const data = await service.user.getUser(_id)
    ctx.body = data
  }
  @get('/detail/:_id')
  async getUserDetail(ctx, next) {
    const { params } = ctx
    const { _id } = params
    const data = await service.user.getUserDetail(_id)
    ctx.body = data
  }
  @post('/user')
  async postUser(ctx, next) {
    const body = ctx.request.body
    ctx.body = await service.user.saveUser(body)
  }
  @put('/user')
  async putUser(ctx, next) {
    const body = ctx.request.body
    ctx.body = await service.user.updateUser(body)
  }
  @del('/users/:_id')
  async delUser(ctx, next) {
    const { params } = ctx
    const { _id } = params
    ctx.body = await service.user.delUser(_id)
  }
  @get('/pubkey')
  async getRsa(ctx, next) {
    ctx.body = await service.user.getRSAKey()
  }
  @post('/login')
  async login(ctx, next) {
    ctx.body = await service.user.login(ctx)
  }
  @post('/logout')
  async logout(ctx, next) {
    ctx.body = await service.user.userLogout(ctx)
  }
}
