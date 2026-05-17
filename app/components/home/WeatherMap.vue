<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { site, lguName, fullLocation } = useConfig()

const weatherTemp = ref<number | null>(null)
const weatherCode = ref<number>(0)
const weatherWindSpeed = ref<number | null>(null)
const weatherMaxTemp = ref<number | null>(null)
const weatherMinTemp = ref<number | null>(null)
const weatherHumidity = ref<number | null>(null)
const weatherCloudCover = ref<number | null>(null)
const weatherRain = ref<number | null>(null)
const weatherApparentTemp = ref<number | null>(null)
const weatherUvIndex = ref<number | null>(null)
const weatherUpdatedAt = ref<string>('')
const weatherError = ref(false)

function getWeatherIcon(code: number) {
  switch (true) {
    case code === 0:
      return 'bi-sun'
    case code >= 1 && code <= 3:
      return 'bi-cloud-sun'
    case code === 45 || code === 48:
      return 'bi-cloud-fog'
    case code >= 51 && code <= 67:
      return 'bi-cloud-drizzle'
    case code >= 80 && code <= 82:
      return 'bi-cloud-rain-heavy'
    case code >= 95 && code <= 99:
      return 'bi-cloud-lightning-rain'
    default:
      return 'bi-thermometer-half'
  }
}

const weatherIcon = computed(() => getWeatherIcon(weatherCode.value))

const weatherDescription = computed(() => {
  const code = weatherCode.value

  switch (true) {
    case code === 0:
      return 'Clear sky'
    case code === 1:
      return 'Mainly clear'
    case code === 2:
      return 'Partly cloudy'
    case code === 3:
      return 'Overcast'
    case code === 45 || code === 48:
      return 'Foggy'
    case code >= 51 && code <= 55:
      return 'Drizzle'
    case code >= 56 && code <= 57:
      return 'Freezing drizzle'
    case code >= 61 && code <= 65:
      return 'Rain'
    case code >= 66 && code <= 67:
      return 'Freezing rain'
    case code >= 71 && code <= 77:
      return 'Snow'
    case code >= 80 && code <= 82:
      return 'Rain showers'
    case code >= 85 && code <= 86:
      return 'Snow showers'
    case code >= 95 && code <= 99:
      return 'Thunderstorm'
    default:
      return 'Weather data unavailable'
  }
})

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${site.value.coordinates.lat}&longitude=${site.value.coordinates.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,uv_index_max&timezone=Asia%2FManila`,
    )

    const data = await response.json()

    if (data?.current) {
      weatherTemp.value = Math.round(data.current.temperature_2m)
      weatherCode.value = data.current.weather_code
      weatherWindSpeed.value = Math.round(data.current.wind_speed_10m)
      weatherHumidity.value = data.current.relative_humidity_2m
      weatherCloudCover.value = data.current.cloud_cover
      weatherRain.value = data.current.rain
      weatherApparentTemp.value = Math.round(data.current.apparent_temperature)

      if (data.current.time) {
        weatherUpdatedAt.value = new Date(data.current.time).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      }

      if (data.daily?.temperature_2m_max?.length) {
        weatherMaxTemp.value = Math.round(data.daily.temperature_2m_max[0])
      }

      if (data.daily?.temperature_2m_min?.length) {
        weatherMinTemp.value = Math.round(data.daily.temperature_2m_min[0])
      }

      if (data.daily?.uv_index_max?.length) {
        weatherUvIndex.value = Number(data.daily.uv_index_max[0].toFixed(1))
      }

      weatherError.value = false
    }
    else {
      weatherError.value = true
    }
  }
  catch {
    weatherError.value = true
  }
}

onMounted(() => {
  fetchWeather()
})
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- ? MARK: Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Weather and Map of {{ lguName }}
          </h2>

          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Current local weather conditions.
          </p>
        </div>
      </div>

      <!-- ? MARK: Weather Dashboard -->
      <div class="overflow-hidden rounded-3xl bg-primary-700 text-white">
        <ClientOnly>
          <div
            v-if="!weatherError"
            class="grid grid-cols-1 gap-8 p-6 lg:grid-cols-[360px_1fr] lg:p-8"
          >
            <!-- ? MARK: Main Weather -->
            <div class="flex flex-col justify-between">
              <div>
                <p class="text-lg font-bold text-white">
                  {{ fullLocation }}
                </p>

                <div class="mt-8 flex items-end gap-3">
                  <span class="text-7xl font-bold leading-none tracking-tight sm:text-8xl">
                    {{ weatherTemp !== null ? weatherTemp : '--' }}
                  </span>

                  <span class="mb-3 text-3xl font-bold">
                    °C
                  </span>
                </div>

                <div class="mt-8 flex items-center gap-5">
                  <i class="bi text-6xl text-white/90" :class="weatherIcon" />

                  <div>
                    <p class="text-2xl font-bold text-white">
                      {{ weatherDescription }}
                    </p>

                    <p v-if="weatherUpdatedAt" class="mt-1 text-sm text-white/75">
                      as of {{ weatherUpdatedAt }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-8 border-t border-white/15 pt-5">
                <div class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
                  <span>
                    Clouds:
                    <strong class="text-white">{{ weatherCloudCover ?? '—' }}%</strong>
                  </span>

                  <span>
                    Humidity:
                    <strong class="text-white">{{ weatherHumidity ?? '—' }}%</strong>
                  </span>

                  <span>
                    Rain now:
                    <strong class="text-white">{{ weatherRain ?? '—' }} mm</strong>
                  </span>

                  <span>
                    Wind:
                    <strong class="text-white">{{ weatherWindSpeed ?? '—' }} km/h</strong>
                  </span>
                </div>
              </div>
            </div>

            <!-- ? MARK: Weather Details -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div class="rounded-2xl border border-white/10 bg-white/10 p-5">
                <i class="bi bi-thermometer-half text-xl text-white/75" />

                <p class="mt-5 text-sm font-medium text-white/85">
                  How hot it feels
                </p>

                <p class="mt-2 text-2xl font-bold text-white">
                  {{ weatherApparentTemp ?? '—' }}°C
                </p>

                <p class="mt-2 text-sm leading-relaxed text-white/80">
                  Takes humidity into account for a feels-like temperature.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-5">
                <i class="bi bi-droplet-half text-xl text-white/75" />

                <p class="mt-5 text-sm font-medium text-white/85">
                  Humidity
                </p>

                <p class="mt-2 text-2xl font-bold text-white">
                  {{ weatherHumidity ?? '—' }}%
                </p>

                <p class="mt-2 text-sm leading-relaxed text-white/80">
                  High humidity can make heat feel heavier.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-5">
                <i class="bi bi-cloud-rain text-xl text-white/75" />

                <p class="mt-5 text-sm font-medium text-white/85">
                  Rain now
                </p>

                <p class="mt-2 text-2xl font-bold text-white">
                  {{ weatherRain ?? '—' }} mm
                </p>

                <p class="mt-2 text-sm leading-relaxed text-white/80">
                  Current measured rainfall at this time.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-5">
                <i class="bi bi-wind text-xl text-white/75" />

                <p class="mt-5 text-sm font-medium text-white/85">
                  Wind speed
                </p>

                <p class="mt-2 text-2xl font-bold text-white">
                  {{ weatherWindSpeed ?? '—' }} km/h
                </p>

                <p class="mt-2 text-sm leading-relaxed text-white/80">
                  Useful for outdoor work and travel planning.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-5">
                <i class="bi bi-thermometer-sun text-xl text-white/75" />

                <p class="mt-5 text-sm font-medium text-white/85">
                  Today’s range
                </p>

                <p class="mt-2 text-2xl font-bold text-white">
                  {{ weatherMinTemp ?? '—' }}° / {{ weatherMaxTemp ?? '—' }}°
                </p>

                <p class="mt-2 text-sm leading-relaxed text-white/80">
                  Expected low and high temperature today.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-5">
                <i class="bi bi-sun text-xl text-white/75" />

                <p class="mt-5 text-sm font-medium text-white/85">
                  UV index
                </p>

                <p class="mt-2 text-2xl font-bold text-white">
                  {{ weatherUvIndex ?? '—' }}
                </p>

                <p class="mt-2 text-sm leading-relaxed text-white/80">
                  Use shade or protection when the UV index is high.
                </p>
              </div>
            </div>
          </div>

          <div
            v-else
            class="flex min-h-[320px] items-center justify-center p-8 text-white/80"
          >
            Weather unavailable
          </div>

          <template #fallback>
            <div class="min-h-[320px] animate-pulse p-8">
              <div class="h-8 w-48 rounded bg-white/20" />
              <div class="mt-8 h-24 w-40 rounded bg-white/20" />
              <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div class="h-32 rounded-2xl bg-white/10" />
                <div class="h-32 rounded-2xl bg-white/10" />
                <div class="h-32 rounded-2xl bg-white/10" />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>
