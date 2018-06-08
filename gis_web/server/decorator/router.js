import Router from 'koa-router'
import convert from 'koa-convert'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import glob from 'glob'
import { resolve } from 'path'
import _ from 'lodash'

export const symbolPrefix = Symbol('prefix')
export const routersMap = new Map()
export const isArray = v => _.isArray(v) ? v : [v]
export const normalizePath = path => path.startsWith('/') ? path : `/${path}`

export default class Route {
  constructor(app, apiPath) {
    this.app = app
    this.router = new Router()
    this.apiPath = apiPath
  }
  init() {
    glob.sync(resolve(this.apiPath, './*.js')).forEach(require) // 引入所有路由文件
    // 把每个路由文件的controller伶出来，然后跟他的路由一一的匹配
    for (const [conf, controller] of routersMap) {
      const controllers = isArray(controller) // 传入路由方法
      let prefixPath = conf.target[symbolPrefix] // 取出各自controller的路径
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path // 取出各自方法的路径
      this.router[conf.method](routerPath, ...controllers) // 映射方法
    }
    this.app.use(convert(bodyparser({
      jsonLimit: '10mb'
    })))
    this.app.use(convert(json()))
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }

}
export const router = conf => (target, key, desc) => { // target[key] 方法 前一个函数的输出是后一个函数的输入
  conf.path = normalizePath(conf.path)
  routersMap.set({
    target: target,
    ...conf
  }, target[key])
}
// 修饰器 用来修饰类和方法 target代表类本身
export const controller = path => target => { target.prototype[symbolPrefix] = path }
// 修饰方法 接收3个参数 类的原型对象 要修饰的属性名 该属性的描述对象
export const get = path => router({
  method: 'get',
  path: path
})

export const post = path => router({
  method: 'post',
  path: path
})

export const put = path => router({
  method: 'put',
  path: path
})

export const del = path => router({
  method: 'delete',
  path: path
})

export const all = path => router({
  method: 'all',
  path: path
})
