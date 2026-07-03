// modules/generate-seo.js
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'

function getPageKeys(dir, base = '') {
  const entries = readdirSync(dir)
  const keys = []

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const isDir = statSync(fullPath).isDirectory()

    if (isDir) {
      keys.push(...getPageKeys(fullPath, join(base, entry)))
    }
    else if (entry.endsWith('.vue')) {
      const name = entry.replace(/\.vue$/, '')
      const segment = name === 'index' ? base : join(base, name)
      const key = segment
        .replace(/\\/g, '/')
        .replace(/\[([^\]]+)\]/g, '$1')
        .replace(/\//g, '-')
        || 'index'
      keys.push(key)
    }
  }

  return keys
}

// Returns a Map of key → hidden (only for items explicitly in nav)
function getNavHiddenMap(navItems, result = new Map()) {
  for (const item of navItems) {
    if (item.href) {
      const key = item.href.replace(/^\//, '').replace(/\//g, '-') || 'index'
      result.set(key, item.hidden === true)
    }
    if (item.children)
      getNavHiddenMap(item.children, result)
  }
  return result
}

export default defineNuxtModule({
  meta: {
    name: 'generate-seo',
  },
  setup(_, nuxt) {
    nuxt.hook('build:before', () => {
      const pagesDir = join(nuxt.options.rootDir, 'app/pages')
      const seoFile = join(nuxt.options.rootDir, 'app/config/seo.json')
      const navFile = join(nuxt.options.rootDir, 'app/config/navigation.json')

      const existingSeo = JSON.parse(readFileSync(seoFile, 'utf-8'))

      console.warn('[DEBUG] budget entry:', JSON.stringify(existingSeo.budget))
      console.warn('[DEBUG] seoFile path:', seoFile)

      const navigation = JSON.parse(readFileSync(navFile, 'utf-8'))
      const pageKeys = getPageKeys(pagesDir)

      // Map of key → hidden, only for pages explicitly in navigation.json
      const navHiddenMap = getNavHiddenMap(navigation.mainNav)

      let changed = 0
      let removed = 0

      for (const key of pageKeys) {
        if (!existingSeo[key]) {
          // New entry — use nav hidden if available, else false
          const titleFragment = key
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')

          existingSeo[key] = {
            titleFragment,
            description: `${titleFragment} — Better {{lguName}}.`,
            ogType: 'website',
            twitterCard: 'summary',
            hidden: navHiddenMap.has(key) ? navHiddenMap.get(key) : false,
          }

          console.warn(`[generate-seo] ✅ Added: ${key} (hidden: ${existingSeo[key].hidden})`)
          changed++
        }
        else if (navHiddenMap.has(key)) {
          // Existing entry — only sync hidden if it's in nav
          const shouldBeHidden = navHiddenMap.get(key)
          if (existingSeo[key].hidden !== shouldBeHidden) {
            existingSeo[key].hidden = shouldBeHidden
            console.warn(`[generate-seo] 🔄 Synced hidden: ${key} → ${shouldBeHidden}`)
            changed++
          }
        }
        // If not in nav — leave hidden as manually set, don't touch
      }

      // Remove orphan entries (keys no longer in pages)
      for (const key of Object.keys(existingSeo)) {
        if (!pageKeys.includes(key)) {
          delete existingSeo[key]
          console.warn(`[generate-seo] 🗑️ Removed orphan: ${key}`)
          removed++
        }
      }

      if (changed === 0 && removed === 0) {
        console.warn('[generate-seo] ✨ seo.json is already up to date.')
      }
      else {
        writeFileSync(seoFile, JSON.stringify(existingSeo, null, 2))
        console.warn(`[generate-seo] 📝 ${changed} changed, ${removed} removed.`)
      }
    })
  },
})
