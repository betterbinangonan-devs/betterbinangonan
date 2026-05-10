<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue'
import Header from '@/components/layout/Header.vue'
</script>

<template>
  <div class="max-w-full mx-auto bg-white shadow-xl min-h-screen relative">
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>
    <!-- <HotlineBar /> -->
    <!-- <InfoBar /> -->
    <Header />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>
