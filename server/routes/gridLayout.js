import { controller, get, post, put, del } from '../decorator/router'
import service from '../controllers'
@controller('/gridlayout')
export class GridLayoutController {
  @get('/gridlayouts')
  async getGridLayouts(ctx, next) {
    ctx.body = await service.gridLayout.getGridLayouts()
  }
  @get('/gridlayouts/:_id')
  async getGridLayout(ctx, next) {
    const { params } = ctx
    const { _id } = params
    const data = await service.gridLayout.getGridLayout(_id)
    ctx.body = data
  }
  @post('/gridlayout')
  async postGridLayout(ctx, next) {
    const body = ctx.request.body
    ctx.body = await service.gridLayout.saveGridLayout(body)
  }
  @put('/gridlayout')
  async putGridLayout(ctx, next) {
    const body = ctx.request.body
    ctx.body = await service.gridLayout.updateGridLayout(body)
  }
  @del('/gridlayouts/:_id')
  async delGridLayout(ctx, next) {
    const { params } = ctx
    const { _id } = params
    ctx.body = await service.gridLayout.delGridLayout(_id)
  }
}
