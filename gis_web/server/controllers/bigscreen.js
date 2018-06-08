import * as bigscreen from '../api/bigscreen.js'
const testLayout = {
  title: '未知湿地',
  gridItems: [
      { 'x': 0, 'y': 0, 'w': 2, 'h': 3, 'i': '0', title: 'test', gridType: 'chart', component: { id: '' }},
      { 'x': 2, 'y': 0, 'w': 8, 'h': 12, 'i': '1', title: 'test', gridType: 'map', component: { id: '' }},
      { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '2', title: 'test', gridType: 'chart', component: { id: '' }},
      { 'x': 0, 'y': 2, 'w': 2, 'h': 3, 'i': '3', title: 'test', gridType: 'chart', component: { id: '' }},
      { 'x': 10, 'y': 2, 'w': 2, 'h': 3, 'i': '4', title: 'test', gridType: 'chart', component: { id: '' }},
      { 'x': 0, 'y': 4, 'w': 2, 'h': 3, 'i': '5', title: 'test', gridType: 'chart', component: { id: '' }},
      { 'x': 10, 'y': 4, 'w': 2, 'h': 3, 'i': '6', title: 'test', gridType: 'chart', component: { id: '' }},
      { 'x': 0, 'y': 6, 'w': 2, 'h': 3, 'i': '7', title: 'test', gridType: 'chart', component: { id: '' }},
      { 'x': 10, 'y': 6, 'w': 2, 'h': 3, 'i': '8', title: 'test', gridType: 'chart', component: { id: '' }}
  ]
}
export async function createGridLayout(ctx, next) {
  const data = testLayout
  const gridLayoutId = await bigscreen.saveGridLayout(data)
  data.gridItems.forEach(async item => {
    item.gridLayoutId = gridLayoutId
    await bigscreen.saveGridItem(item)
  })
  const gridLayout = await bigscreen.fetchGridLayout({ _id: gridLayoutId })
  const gridItems = await bigscreen.fetchGridItems({ gridLayoutId: gridLayout._id })
  const obj = {
    code: 20000,
    gridItems: [...gridItems],
    gridLayout: gridLayout
  }
  ctx.body = obj
}
export async function fetchGridLayout(ctx, next) {
  const query = ctx.query
  const gridLayout = await bigscreen.fetchGridLayout(query)
  const gridItems = await bigscreen.fetchGridItems({ gridLayoutId: gridLayout._id }, '-component')
  const obj = {
    code: 20000,
    gridItems: [...gridItems],
    gridLayout: gridLayout
  }
  ctx.body = obj
}
export async function fetchGridLayoutDetail(ctx, next) {
  const query = ctx.query
  const gridLayout = await bigscreen.fetchGridLayout(query)
  const gridItems = await bigscreen.fetchGridItems({ gridLayoutId: gridLayout._id })
  const obj = {
    code: 20000,
    gridItems: [...gridItems],
    gridLayout: gridLayout
  }
  ctx.body = obj
}

export async function fetchGridLayoutList(ctx, next) {
  const fetchGridLayoutList = await bigscreen.fetchGridLayoutList()
  const obj = {
    code: 20000,
    gridLayoutList: [...fetchGridLayoutList]
  }
  ctx.body = obj
}

export async function fetchGridItem(ctx, next) {
  const fetchGridItem = await bigscreen.fetchGridItem(ctx.query)
  const obj = {
    code: 20000,
    gridItem: fetchGridItem
  }
  ctx.body = obj
}

export async function saveGridItem(ctx, next) {
  await bigscreen.saveGridItem(ctx.request.body)
  const obj = {
    code: 20000
  }
  ctx.body = obj
}

export async function deleteGridLayout(ctx, next) {
  const gridLayout = await bigscreen.deleteGridLayout(ctx.query)
  await bigscreen.deleteGridItem({ gridLayoutId: gridLayout._id })
  const obj = {
    code: 20000
  }
  ctx.body = obj
}
export async function gridItemUpdate(ctx, next) {
  const msg = {}
  const obj = ctx.request.body
  try {
    await bigscreen.gridItemUpdate(obj._id, obj)
    msg.code = 20000
  } catch (error) {
    msg.message = error
    msg.code = 50000
  }
  ctx.body = msg
}
export async function gridLayoutUpdate(ctx, next) {
  const msg = {}
  const obj = ctx.request.body
  try {
    obj.gridItems.forEach(async item => {
      await bigscreen.gridItemUpdate(item._id, item)
    })
    await bigscreen.gridLayoutUpdate(obj.gridLayout._id, obj.gridLayout)
    msg.code = 20000
  } catch (error) {
    msg.message = error
    msg.code = 50000
  }
  ctx.body = msg
}
export async function saveGridLayout(ctx, next) {
  const data = ctx.request.body
  const gridLayoutId = await bigscreen.saveGridLayout(data.gridLayout)
  data.gridItems.forEach(async item => {
    item.gridLayoutId = gridLayoutId
    await bigscreen.saveGridItem(item)
  })
  const obj = {
    code: 20000
  }
  ctx.body = obj
}
