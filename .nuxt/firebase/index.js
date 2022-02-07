import createApp from './app.js'

import authService from './service.auth.js'

const appConfig = {"apiKey":"AIzaSyDwa9qOb1dC8sb7C5ZQAzp_9WMmEN5szF4","authDomain":"wasocial-3e79f.firebaseapp.com","databaseURL":"https:\u002F\u002Fwasocial-3e79f-default-rtdb.firebaseio.com","projectId":"wasocial-3e79f","storageBucket":"wasocial-3e79f.appspot.com","messagingSenderId":"744192178281","appId":"1:744192178281:web:5a00b2800c8e41f04d8af8"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}