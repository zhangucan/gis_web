import * as map from '../api/map.js'
// import Msg from '../utils/Msg'
export async function fetchMap(ctx, next) {
  const query = ctx.query
  const data = await map.fetchMap(query)
  const obj = {
    code: 20000,
    map: data,
    vectorFeatures: data.vectorFeatures
  }
  ctx.body = obj
}
export async function fetchMapList(ctx, next) {
  const { title } = ctx.query
  if (!title) {
    const mapLsit = await map.fetchMapList()
    const obj = {
      code: 20000,
      mapLsit: [...mapLsit]
    }
    ctx.body = obj
  }
}

export async function saveMap(ctx, next) {
  const mapId = await map.saveMap(ctx.request.body)
  const obj = {
    code: 20000,
    mapId: mapId
  }
  ctx.body = obj
}

export async function saveVectorFeatures(ctx, next) {
  await map.saveVectorFeatures(ctx.request.body)
  const obj = {
    code: 20000
  }
  ctx.body = obj
}
export async function fetchVectors(ctx, next) {
  const vectors = await map.fetchVectorFeatures(ctx.query)
  const obj = {
    code: 20000,
    vectors: vectors
  }
  ctx.body = obj
}
