import * as bigscreenApi from '../../api/bigscreen'
import * as mapApi from '../../api/map'
export const Server = socket => {
  socket.on('bigscreentList', async data => {
    const layoutList = []
    // for (let i = 0; i < data.length; i++) {
    //   bigscreenApi.fetchGridItems({ gridType: 'map', gridLayoutId: data[i] }, '-component').then(gridItem => {
    //     if (gridItem[0].component.id !== 'test') {
    //       mapApi.fetchMap({ '_id': gridItem[0].component.id }).then(mapData => {
    //         const map = {
    //           data: mapData,
    //           gridLayoutId: gridItem[0].gridLayoutId
    //         }
    //         layoutList.push(map)
    //         if (data.length === i + 1) {
    //           socket.emit('fetchGridLayoutList', layoutList)
    //         }
    //       })
    //     }
    //   })
    // }
    // socket.emit('fetchGridLayoutList', layoutList)
    await data.forEach(async (item, index) => {
      const gridItem = await bigscreenApi.fetchGridItems({ gridType: 'map', gridLayoutId: item }, 'component.id gridLayoutId')
      if (gridItem[0].component.id !== 'test') {
        const mapData = await mapApi.fetchMap2({ '_id': gridItem[0].component.id })
        const map = {
          data: mapData,
          gridLayoutId: gridItem[0].gridLayoutId
        }
        layoutList.push(map)
        if (data.length === index + 1) {
          socket.emit('fetchGridLayoutList', layoutList)
        }
      }
    })
  })
}
