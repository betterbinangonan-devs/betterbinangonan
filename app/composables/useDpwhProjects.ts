export interface DpwhProject {
  contractId: string
  description: string
  category: string
  componentCategories: string
  status: string
  budget: number
  amountPaid: number
  progress: number
  location: {
    province: string
    region: string
  }
  contractor: string
  startDate: string
  completionDate: string | null
  infraYear: string
  programName: string
  sourceOfFunds: string
  latitude: number | null
  longitude: number | null
  hasSatelliteImage: boolean
}

export interface DpwhSummary {
  totalProjects: number
  completed: number
  ongoing: number
  notStarted: number
  forProcurement: number
  terminated: number
  totalBudget: number
}

export interface DpwhResponse {
  data: DpwhProject[]
  summary: DpwhSummary
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function useDpwhProjects() {
  const selectedCategory = ref('')
  const selectedStatus = ref('')
  const selectedYear = ref('')
  const page = ref(1)

  const { data, pending, error, refresh } = useAsyncData(
    'dpwh-projects',
    () => $fetch<{ status: number, data: DpwhResponse }>('/api/dpwh', {
      params: { page: page.value },
    }),
    { watch: [page] },
  )

  const projects = computed(() => data.value?.data?.data ?? [])
  const summary = computed(() => data.value?.data?.summary ?? null)
  const totalPages = computed(() => data.value?.data?.pagination?.totalPages ?? 1)

  const categories = computed(() => {
    const cats = new Set(projects.value.map(p => p.category))
    return ['', ...Array.from(cats)].map(c => ({ label: c || 'All Categories', value: c }))
  })

  const years = computed(() => {
    const yrs = new Set(projects.value.map(p => p.infraYear))
    return ['', ...Array.from(yrs).sort((a, b) => Number(b) - Number(a))].map(y => ({ label: y || 'All Years', value: y }))
  })

  const filteredProjects = computed(() => {
    return projects.value.filter((p) => {
      const matchCategory = selectedCategory.value ? p.category === selectedCategory.value : true
      const matchStatus = selectedStatus.value ? p.status === selectedStatus.value : true
      const matchYear = selectedYear.value ? p.infraYear === selectedYear.value : true
      return matchCategory && matchStatus && matchYear
    })
  })

  function formatBudget(amount: number) {
    if (amount >= 1_000_000_000)
      return `₱${(amount / 1_000_000_000).toFixed(2)}B`
    if (amount >= 1_000_000)
      return `₱${(amount / 1_000_000).toFixed(2)}M`
    return `₱${amount.toLocaleString()}`
  }

  function getStatusColor(status: string) {
    if (status === 'Completed')
      return 'text-green-600 bg-green-50'
    if (status === 'On-Going')
      return 'text-blue-600 bg-blue-50'
    if (status === 'For Procurement')
      return 'text-yellow-600 bg-yellow-50'
    return 'text-gray-600 bg-gray-50'
  }

  function getCategoryIcon(category: string) {
    const icons: Record<string, string> = {
      'Roads': 'ri-road-map-line',
      'Bridges': 'ri-bridge-line',
      'Buildings and Facilities': 'ri-building-line',
      'Flood Control and Drainage': 'ri-flood-line',
      'Water Provision and Storage': 'ri-water-flash-line',
    }
    return icons[category] || 'ri-tools-line'
  }

  return {
    projects,
    filteredProjects,
    summary,
    pending,
    error,
    page,
    totalPages,
    selectedCategory,
    selectedStatus,
    selectedYear,
    categories,
    years,
    refresh,
    formatBudget,
    getStatusColor,
    getCategoryIcon,
  }
}
