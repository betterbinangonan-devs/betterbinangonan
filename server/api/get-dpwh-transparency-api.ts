// // server\api\get-dpwh-transparency-api.ts
// import process from 'node:process'

// export default defineEventHandler(async (event) => {
//   const query = getQuery(event)

//   // dev: local static JSON
//   if (process.env.NODE_ENV === 'development') {
//     const { readFileSync } = await import('node:fs')
//     const { join } = await import('node:path')
//     const filePath = join(process.cwd(), 'public/data/dpwh-projects.json')
//     const raw = readFileSync(filePath, 'utf-8')
//     const json = JSON.parse(raw)
//     json.data.pagination.totalPages = 1
//     json.data.pagination.hasNext = false
//     return json
//   }

//   // production: real API
//   return await $fetch('https://api.transparency.dpwh.gov.ph/projects', {
//     params: {
//       page: query.page ?? 1,
//       limit: 50,
//       search: query.municipality ?? 'binangonan',
//       province: String(query.province ?? 'RIZAL').toUpperCase(),
//     },
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//       'Referer': 'https://transparency.dpwh.gov.ph/',
//       'Origin': 'https://transparency.dpwh.gov.ph',
//       'Accept': 'application/json, text/plain, */*',
//     },
//   })
// })

// server/api/get-dpwh-transparency-api.ts
interface DpwhStaticResponse {
  status: number
  code: string
  data: {
    data: unknown[]
    summary?: unknown
    pagination?: {
      page: number
      limit: number
      totalCount: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
}

export default defineEventHandler(async (_event) => {
  const { readFileSync } = await import('node:fs')
  const { join } = await import('node:path')
  const { cwd } = await import('node:process')

  const filePath = join(cwd(), 'public/data/dpwh-projects.json')
  const raw = readFileSync(filePath, 'utf-8')
  const json: DpwhStaticResponse = JSON.parse(raw)

  if (json.data?.pagination) {
    json.data.pagination.totalPages = 1
    json.data.pagination.hasNext = false
  }
  return json
})
