import Socket from 'socket.io'
import http from 'http'
import R from 'ramda'
import { resolve } from 'path'

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3001
const MIDDLEWARES = ['chooseScreen']

export const Server = app => {
  console.log('creat socket server')
  var server = http.createServer(app.callback())
  const io = Socket(server)
  // Socket.io的标准用法
  io.on('connection', function(socket) {
    socket.on('my other event', function(data) {
      console.log(data)
    })
    initSocketMiddleWares(socket)(MIDDLEWARES)
  })
  // 开启服务器
  server.listen(port, host)
  console.info(`Now running on${host}:${port}`)
}
// __dirname 当前路径
const r = path => resolve(__dirname, path)
function initSocketMiddleWares(socket) {
  // 中间件的个数不定，通过 Ramda 的特性，从右往左进行函数组合，右侧函数的返回结果总是左侧函数的输入参数
  // R.map(console.log)([1, 2, 3])
  // MIDDLEWARE 数组交给了 R.map
  // 分别拿到的单个数组中的值，我们可以通过 R.compose 再次进行组合。
  return R.map(R.compose(
    R.map(i => i(socket)),
    require,
    i => `${r('./socket')}/${i}`)
  )
}
