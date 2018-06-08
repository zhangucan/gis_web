import { controller, get, post, put, del } from '../decorator/router'
import service from '../controllers'
@controller('/map')
export class MapController {
  @get('/maps')
  async getMaps(ctx, next) {
    ctx.body = await service.map.getMaps()
  }
  @get('/maps/:_id')
  async getMap(ctx, next) {
    const { params } = ctx
    const { _id } = params
    const data = await service.map.getMap(_id)
    ctx.body = data
  }
  @post('/map')
  async postMap(ctx, next) {
    const body = ctx.request.body
    ctx.body = await service.map.saveMap(body)
  }
  @put('/map')
  async putMap(ctx, next) {
    const body = ctx.request.body
    ctx.body = await service.map.updateMap(body)
  }
  @del('/maps/:_id')
  async delMap(ctx, next) {
    const { params } = ctx
    const { _id } = params
    ctx.body = await service.map.delMap(_id)
  }
}
