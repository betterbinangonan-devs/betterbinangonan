// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({
              el: to.hash,
              top: 100,
              behavior: 'smooth',
            })
          }
          else {
            resolve({ top: 0 })
          }
        }, 300)
      })
    }

    return { top: 0 }
  },
}
