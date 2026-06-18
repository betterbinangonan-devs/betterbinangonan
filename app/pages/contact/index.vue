<!-- app\pages\contact\index.vue -->
<script setup lang="ts">
import { useConfig } from '@/composables/useConfig'

const { site, lguName } = useConfig()

const project = computed(() => site.value.project)

const contactItems = computed(() => [
  {
    id: 'email',
    icon: 'ri-mail-line',
    name: 'Email',
    value: project.value?.email || '—',
    href: project.value?.email ? `mailto:${project.value.email}` : null,
    description: 'Send us an email inquiry.',
    visible: Boolean(project.value?.email),
  },
  {
    id: 'volunteer-email',
    icon: 'ri-team-line',
    name: 'Volunteer Email',
    value: project.value?.volunteerEmail || '—',
    href: project.value?.volunteerEmail ? `mailto:${project.value.volunteerEmail}` : null,
    description: 'Interested in volunteering? Reach out here.',
    visible: Boolean(project.value?.volunteerEmail && project.value.volunteerEmail !== project.value.email),
  },
  {
    id: 'phone',
    icon: 'ri-phone-line',
    name: 'Phone',
    value: project.value?.phone || '—',
    href: project.value?.phone ? `tel:${project.value.phone}` : null,
    description: 'Call us directly.',
    visible: Boolean(project.value?.phone),
  },
  {
    id: 'office',
    icon: 'ri-map-pin-line',
    name: 'Office Address',
    value: project.value?.officeAddress || '—',
    href: null,
    description: 'Our physical office location.',
    visible: Boolean(project.value?.officeAddress),
  },
  {
    id: 'report',
    icon: 'ri-bug-line',
    name: 'Report an Issue',
    value: project.value?.reportIssueUrl?.replace(/^https?:\/\//, '') || '—',
    href: project.value?.reportIssueUrl || null,
    description: 'Found a bug or data issue? Let us know on GitHub.',
    visible: Boolean(project.value?.reportIssueUrl),
  },
  {
    id: 'donate',
    icon: 'ri-heart-line',
    name: 'Support the Project',
    value: project.value?.donationUrl?.replace(/^https?:\/\//, '') || '—',
    href: project.value?.donationUrl || null,
    description: 'Help keep BetterBinangonan running.',
    visible: Boolean(project.value?.donationUrl),
  },
].filter(i => i.visible))

const socialLinks = computed(() => [
  { id: 'facebook', icon: 'ri-facebook-line', name: 'Facebook', href: project.value?.social?.facebook },
  { id: 'github', icon: 'ri-github-line', name: 'GitHub', href: project.value?.social?.github },
  { id: 'twitter', icon: 'ri-twitter-x-line', name: 'Twitter / X', href: project.value?.social?.twitter },
  { id: 'instagram', icon: 'ri-instagram-line', name: 'Instagram', href: project.value?.social?.instagram },
  { id: 'youtube', icon: 'ri-youtube-line', name: 'YouTube', href: project.value?.social?.youtube },
  { id: 'discord', icon: 'ri-discord-line', name: 'Discord', href: project.value?.social?.discord },
  { id: 'linkedin', icon: 'ri-linkedin-line', name: 'LinkedIn', href: project.value?.social?.linkedin },
].filter((l): l is { id: string, icon: string, name: string, href: string } => Boolean(l.href)))

const developers = computed(() => site.value.developers ?? [])

function developerLinks(dev: typeof developers.value[0]) {
  return [
    { icon: 'ri-github-line', href: dev.github, label: 'GitHub' },
    { icon: 'ri-linkedin-line', href: dev.linkedin, label: 'LinkedIn' },
    { icon: 'ri-global-line', href: dev.website, label: 'Website' },
  ].filter((l): l is { icon: string, href: string, label: string } => Boolean(l.href))
}

const volunteerRoles = computed(() => project.value?.volunteerRoles ?? [])

const tocItems = computed(() => [
  { id: 'contact-info', label: 'Contact Info', visible: contactItems.value.length > 0 },
  { id: 'social-media', label: 'Social Media', visible: socialLinks.value.length > 0 },
  { id: 'developers', label: 'Developers', visible: developers.value.length > 0 },
  { id: 'volunteers', label: 'Volunteers', visible: Boolean(project.value?.lookingForVolunteers) },
])
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-contacts-line" badge-text="Contact" title="Contact Us" description="Reach out to us for any concerns, inquiries, or contributions." :breadcrumbs="[{ label: 'Contact' }]" />

    <UiPageWithToc :items="tocItems">
      <!-- ? MARK: Contact Info -->
      <section id="contact-info" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Get in Touch
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Contact Information
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              You can reach us through any of the following channels.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <component :is="item.href ? 'a' : 'div'" v-for="item in contactItems" :key="item.id" :href="item.href ?? undefined" class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition hover:border-primary-200 hover:bg-primary-50/30">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                <i :class="item.icon" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="font-semibold text-gray-900">
                    {{ item.name }}
                  </h3>
                  <i v-if="item.href" class="ri-arrow-right-up-line text-sm text-gray-300 transition group-hover:text-primary-600" />
                </div>
                <p class="mt-1 text-lg font-bold text-gray-900 group-hover:text-primary-700 break-all">
                  {{ item.value }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ item.description }}
                </p>
              </div>
            </component>
          </div>
        </div>
      </section>

      <!-- ? MARK: Social Media -->
      <section v-if="socialLinks.length" id="social-media" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Follow Us
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Social Media
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              Stay updated through our official social media pages.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <a v-for="link in socialLinks" :key="link.id" :href="link.href" target="_blank" rel="noopener noreferrer" class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition hover:border-primary-200 hover:bg-primary-50/30">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                <i :class="link.icon" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="font-semibold text-gray-900">
                    {{ link.name }}
                  </h3>
                  <i class="ri-arrow-right-up-line text-sm text-gray-300 transition group-hover:text-primary-600" />
                </div>
                <p class="mt-1 break-all text-sm text-gray-500">
                  {{ link.href.replace(/^https?:\/\//, '') }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- ? MARK: Developers -->
      <section v-if="developers.length" id="developers" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Open Source
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Developers
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              The people who built and maintain Better{{ lguName }}.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <div v-for="dev in developers" :key="dev.name" class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition">
              <!-- Avatar or fallback -->
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600 overflow-hidden">
                <img v-if="dev.avatar" :src="dev.avatar" :alt="dev.name" class="h-full w-full object-cover rounded-full">
                <i v-else class="ri-user-line" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="font-semibold text-gray-900">
                  {{ dev.name }}
                </h3>
                <p class="mt-0.5 text-sm text-gray-500">
                  {{ dev.role }}
                </p>
                <div class="mt-2 flex flex-wrap gap-3">
                  <a v-for="link in developerLinks(dev)" :key="link.label" :href="link.href" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:underline">
                    <i :class="link.icon" />
                    {{ link.label }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ? MARK: Volunteers -->
      <section v-if="project?.lookingForVolunteers" id="volunteers" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Join Us
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              We're Looking for Volunteers
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              {{ project?.description }}
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <!-- Roles card -->
            <div v-if="volunteerRoles.length" class="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                <i class="ri-team-line" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="font-semibold text-gray-900">
                  Open Roles
                </h3>
                <ul class="mt-2 space-y-1">
                  <li v-for="role in volunteerRoles" :key="role" class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="ri-checkbox-circle-line text-primary-500" />
                    {{ role }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Apply card -->
            <a v-if="project?.volunteerEmail" :href="`mailto:${project.volunteerEmail}`" class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition hover:border-primary-200 hover:bg-primary-50/30">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                <i class="ri-mail-send-line" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="font-semibold text-gray-900">
                    Apply as Volunteer
                  </h3>
                  <i class="ri-arrow-right-up-line text-sm text-gray-300 transition group-hover:text-primary-600" />
                </div>
                <p class="mt-1 text-sm text-gray-500">
                  {{ project.volunteerEmail }}
                </p>
              </div>
            </a>

            <!-- GitHub card -->
            <a v-if="project?.social?.github" :href="project.social.github" target="_blank" rel="noopener noreferrer" class="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 no-underline transition hover:border-primary-200 hover:bg-primary-50/30">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-lg text-primary-600">
                <i class="ri-github-line" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-3">
                  <h3 class="font-semibold text-gray-900">
                    Contribute on GitHub
                  </h3>
                  <i class="ri-arrow-right-up-line text-sm text-gray-300 transition group-hover:text-primary-600" />
                </div>
                <p class="mt-1 text-sm text-gray-500">
                  {{ project.social.github.replace(/^https?:\/\//, '') }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </UiPageWithToc>
  </div>
</template>
