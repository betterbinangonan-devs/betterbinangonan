export default defineNuxtRouteMiddleware(() => {
  const breadcrumbs = useState<{ label: string, href?: string }[]>('page-breadcrumbs', () => [])
  breadcrumbs.value = []
})
