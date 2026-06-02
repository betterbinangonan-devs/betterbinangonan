export default defineEventHandler(async (event) => {
  const query = getQuery(event)

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
