import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // dev: local static JSON
  if (process.env.NODE_ENV === 'development') {
    const filePath = join(process.cwd(), 'public/data/dpwh-projects.json')
    const raw = readFileSync(filePath, 'utf-8')
    const json = JSON.parse(raw)

    json.data.pagination.totalPages = 1
    json.data.pagination.hasNext = false

    return json
  }

  // production: real API
  return await $fetch('https://api.transparency.dpwh.gov.ph/projects', {
    params: {
      page: query.page ?? 1,
      limit: 50,
      search: 'binangonan',
      province: 'RIZAL',
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://transparency.dpwh.gov.ph/',
      'Origin': 'https://transparency.dpwh.gov.ph',
      'Accept': 'application/json, text/plain, */*',
    },
  })
})
