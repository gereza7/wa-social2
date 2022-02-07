import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _182efbda = () => interopDefault(import('../pages/hola.vue' /* webpackChunkName: "pages/hola" */))
const _1a1c327d = () => interopDefault(import('../pages/home.vue' /* webpackChunkName: "pages/home" */))
const _8467f28a = () => interopDefault(import('../pages/auth/signin.vue' /* webpackChunkName: "pages/auth/signin" */))
const _48c5d928 = () => interopDefault(import('../pages/auth/signout.vue' /* webpackChunkName: "pages/auth/signout" */))
const _7da760a4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/hola",
    component: _182efbda,
    name: "hola"
  }, {
    path: "/home",
    component: _1a1c327d,
    name: "home"
  }, {
    path: "/auth/signin",
    component: _8467f28a,
    name: "auth-signin"
  }, {
    path: "/auth/signout",
    component: _48c5d928,
    name: "auth-signout"
  }, {
    path: "/",
    component: _7da760a4,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
