import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { skipWaiting, clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'

// const self =as ServiceWorkerGlobalScope;

console.log('[SW] READY')

skipWaiting()
clientsClaim()

cleanupOutdatedCaches()

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST)

console.log('registering route')
registerRoute(
  /.*\/kodict\/api\/categories/,
  new StaleWhileRevalidate({ cacheName: 'kodict-cache' })
)

// /kodict/api/word
registerRoute(
  /.*\/kodict\/api\/word/,
  new StaleWhileRevalidate({ cacheName: 'kodict-cache' })
)
