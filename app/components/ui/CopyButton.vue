<!-- app\components\ui\CopyButton.vue -->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
  label?: string
}>(), {
  label: 'Copy',
})

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  if (!props.value)
    return
  try {
    await navigator.clipboard.writeText(props.value)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    // clipboard blocked (e.g. permissions); do nothing
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button type="button" class="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700" :aria-label="copied ? 'Copied' : `${props.label} ${props.value}`" :title="copied ? 'Copied!' : props.label" @click.stop.prevent="copy">
    <i :class="copied ? 'ri-check-line text-green-600' : 'ri-file-copy-line'" />
  </button>
</template>
