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
const forecastDays = ref<{ date: string, icon: string, desc: string, max: number, min: number }[]>([])

function getWeatherIcon(code: number) {
  switch (true) {
    case code === 0: return 'ri-sun-line'
    case code >= 1 && code <= 3: return 'ri-cloudy-line'
    case code === 45 || code === 48: return 'ri-foggy-line'
    case code >= 51 && code <= 67: return 'ri-showers-line'
    case code >= 80 && code <= 82: return 'ri-rainy-line'
    case code >= 95 && code <= 99: return 'ri-flashlight-line'
    default: return 'ri-sun-line'
  }
}

function getWeatherDescription(code: number) {
  switch (true) {
    case code === 0: return 'Clear sky'
    case code === 1: return 'Mainly clear'
    case code === 2: return 'Partly cloudy'
    case code === 3: return 'Overcast'
    case code === 45 || code === 48: return 'Foggy'
    case code >= 51 && code <= 55: return 'Drizzle'
    case code >= 56 && code <= 57: return 'Freezing drizzle'
    case code >= 61 && code <= 65: return 'Rain'
    case code >= 66 && code <= 67: return 'Freezing rain'
    case code >= 71 && code <= 77: return 'Snow'
    case code >= 80 && code <= 82: return 'Rain showers'
    case code >= 85 && code <= 86: return 'Snow showers'
    case code >= 95 && code <= 99: return 'Thunderstorm'
    default: return 'Weather data unavailable'
  }
}

const weatherIcon = computed(() => getWeatherIcon(weatherCode.value))
const weatherDescription = computed(() => getWeatherDescription(weatherCode.value))

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${site.value.coordinates.lat}&longitude=${site.value.coordinates.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,uv_index_max,weather_code&timezone=Asia%2FManila&forecast_days=4`,
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
      if (data.daily?.temperature_2m_max?.length)
        weatherMaxTemp.value = Math.round(data.daily.temperature_2m_max[0])
      if (data.daily?.temperature_2m_min?.length)
        weatherMinTemp.value = Math.round(data.daily.temperature_2m_min[0])
      if (data.daily?.uv_index_max?.length)
        weatherUvIndex.value = Number(data.daily.uv_index_max[0].toFixed(1))

      if (data.daily?.time?.length) {
        forecastDays.value = data.daily.time.slice(1, 4).map((date: string, i: number) => ({
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          icon: getWeatherIcon(data.daily.weather_code[i + 1]),
          desc: getWeatherDescription(data.daily.weather_code[i + 1]),
          max: Math.round(data.daily.temperature_2m_max[i + 1]),
          min: Math.round(data.daily.temperature_2m_min[i + 1]),
        }))
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

onMounted(() => fetchWeather())
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- ? MARK: Section Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Weather in {{ lguName }}
          </h2>
          <p class="mt-1 max-w-xl text-base leading-relaxed text-gray-600">
            Current local weather conditions.
          </p>
        </div>
      </div>

      <!-- ? MARK: Weather Dashboard -->
      <div class="overflow-hidden rounded-3xl bg-primary-700 text-white">
        <ClientOnly>
          <!-- Loaded -->
          <div v-if="!weatherError" class="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[375px_1fr] lg:p-6">
            <!-- ? MARK: Left: Main Weather -->
            <div class="flex flex-col justify-between">
              <div>
                <p class="text-base font-semibold text-white/80">
                  {{ fullLocation }}
                </p>

                <div class="mt-4 flex items-end gap-2">
                  <span class="text-7xl font-bold leading-none tracking-tight">
                    {{ weatherTemp !== null ? weatherTemp : '--' }}
                  </span>
                  <span class="mb-2 text-3xl font-bold">°C</span>
                </div>

                <div class="mt-4 flex items-center gap-3">
                  <i class="text-5xl text-white/90" :class="weatherIcon" />
                  <div>
                    <p class="text-xl font-bold text-white">
                      {{ weatherDescription }}
                    </p>
                    <p v-if="weatherUpdatedAt" class="mt-0.5 text-xs text-white/60">
                      as of {{ weatherUpdatedAt }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-5 border-t border-white/15 pt-4">
                <div class="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/80">
                  <span>Clouds: <strong class="text-white">{{ weatherCloudCover ?? '—' }}%</strong></span>
                  <span>Humidity: <strong class="text-white">{{ weatherHumidity ?? '—' }}%</strong></span>
                  <span>Rain: <strong class="text-white">{{ weatherRain ?? '—' }} mm</strong></span>
                  <span>Wind: <strong class="text-white">{{ weatherWindSpeed ?? '—' }} km/h</strong></span>
                </div>
              </div>
            </div>

            <!-- ? MARK: Right: Detail Cards -->
            <div class="grid grid-cols-2 gap-3 lg:grid-cols-3">
              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-temp-hot-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  How hot it feels
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  {{ weatherApparentTemp ?? '—' }}°C
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Takes humidity into account.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-drop-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  Humidity
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  {{ weatherHumidity ?? '—' }}%
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  High humidity makes heat heavier.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-rainy-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  Rain now
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  {{ weatherRain ?? '—' }} mm
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Current measured rainfall.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-windy-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  Wind speed
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  {{ weatherWindSpeed ?? '—' }} km/h
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Useful for outdoor planning.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-temp-cold-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  Today's range
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  {{ weatherMinTemp ?? '—' }}° / {{ weatherMaxTemp ?? '—' }}°
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Expected low and high today.
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                <i class="ri-sun-line text-lg text-white/70" />
                <p class="mt-4 text-xs font-medium text-white/80">
                  UV index
                </p>
                <p class="mt-1 text-xl font-bold text-white">
                  {{ weatherUvIndex ?? '—' }}
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-white/70">
                  Use shade when this is high.
                </p>
              </div>
            </div>
          </div>

          <!-- Error -->
          <div
            v-else
            class="flex min-h-[260px] items-center justify-center p-8 text-white/70"
          >
            <div class="text-center">
              <i class="ri-error-warning-line text-3xl" />
              <p class="mt-2 text-sm">
                Weather unavailable
              </p>
            </div>
          </div>

          <!-- SSR Fallback -->
          <template #fallback>
            <div class="min-h-[260px] animate-pulse p-6">
              <div class="h-6 w-40 rounded bg-white/20" />
              <div class="mt-4 h-16 w-32 rounded bg-white/20" />
              <div class="mt-4 grid grid-cols-3 gap-3">
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
                <div class="h-28 rounded-2xl bg-white/10" />
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- ? MARK: 3-Day Forecast -->
      <ClientOnly>
        <div v-if="forecastDays.length" class="mt-4 overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <div class="border-b border-gray-100 px-5 py-4">
            <p class="text-sm font-semibold text-gray-900">
              3-Day Forecast
            </p>
            <p class="mt-0.5 text-xs text-gray-500">
              Expected weather conditions for the next 3 days
            </p>
          </div>
          <div class="grid grid-cols-3 divide-x divide-gray-100">
            <div
              v-for="day in forecastDays"
              :key="day.date"
              class="p-5 text-center"
            >
              <p class="text-xs font-medium text-gray-500">
                {{ day.date }}
              </p>
              <i class="mt-3 block text-3xl text-primary-600" :class="day.icon" />
              <p class="mt-2 text-xs text-gray-500">
                {{ day.desc }}
              </p>
              <p class="mt-2 text-lg font-bold text-gray-900">
                {{ day.max }}°
                <span class="text-sm font-normal text-gray-400">/ {{ day.min }}°</span>
              </p>
            </div>
          </div>
        </div>
      </ClientOnly>

      <!-- ? MARK: Source note -->
      <p class="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
        <i class="ri-information-line" />
        Source:
        <a
          href="https://open-meteo.com/en/docs?latitude=14.4646&longitude=121.1929"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-600 hover:underline"
        >
          OpenMateo Weather Forecast API
        </a>
      </p>
    </div>
  </section>
</template>
