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
  { id: 'send-message', label: 'Send a Message', visible: true },
  { id: 'contact-info', label: 'Contact Info', visible: contactItems.value.length > 0 },
  { id: 'social-media', label: 'Social Media', visible: socialLinks.value.length > 0 },
  { id: 'developers', label: 'Developers', visible: developers.value.length > 0 },
  { id: 'volunteers', label: 'Volunteers', visible: Boolean(project.value?.lookingForVolunteers) },
])

const subjectOptions = [
  { value: 'bug', label: 'Report a Website Bug' },
  { value: 'wrong-info', label: 'Report Wrong/Incorrect Information' },
  { value: 'volunteer', label: 'Volunteer Inquiry' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'others', label: 'Others' },
]

// ? MARK: Contact form
const form = reactive({
  name: '',
  email: '',
  subject: '',
  subjectOther: '',
  message: '',
  website: '',
})

const finalSubject = computed(() => {
  if (form.subject === 'others')
    return form.subjectOther.trim()
  return subjectOptions.find(o => o.value === form.subject)?.label ?? ''
})

const formStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const formErrorMessage = ref('')

async function submitForm() {
  formStatus.value = 'loading'
  formErrorMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...form,
        subject: finalSubject.value,
      },
    })
    formStatus.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.subjectOther = ''
    form.message = ''
  }
  catch (err: any) {
    formStatus.value = 'error'
    const fieldErrors = err?.data?.data?.fieldErrors
    if (fieldErrors) {
      const firstError = Object.values(fieldErrors).flat()[0]
      formErrorMessage.value = typeof firstError === 'string' ? firstError : 'Please check your input and try again.'
    }
    else {
      formErrorMessage.value = err?.data?.statusMessage || 'Something went wrong. Please try again.'
    }
  }
}
</script>

<template>
  <div>
    <UiPageHero badge-icon="ri-contacts-line" badge-text="Contact" title="Contact Us" description="Reach out to us for any concerns, inquiries, or contributions." :breadcrumbs="[{ label: 'Contact' }]" />

    <UiPageWithToc :items="tocItems">
      <!-- ? MARK: Send a Message (form) -->
      <section id="send-message" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Get in Touch
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Send Us a Message
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              Fill out the form below and we'll get back to you as soon as we can.
            </p>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <form v-if="formStatus !== 'success'" class="flex flex-col gap-5" @submit.prevent="submitForm">
              <!-- honeypot field - hidden from real users, bots lang mapupunuan nito -->
              <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden">

              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="name" class="mb-1.5 block text-sm font-medium text-gray-700">Your Name</label>
                  <input id="name" v-model="form.name" type="text" required placeholder="Juan Dela Cruz" class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                </div>

                <div>
                  <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700">Your Email Address</label>
                  <input id="email" v-model="form.email" type="email" required placeholder="juan@example.com" class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                </div>
              </div>

              <div>
                <label for="subject" class="mb-1.5 block text-sm font-medium text-gray-700">Subject</label>
                <select id="subject" v-model="form.subject" required class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option v-for="opt in subjectOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>

                <input v-if="form.subject === 'others'" v-model="form.subjectOther" type="text" required placeholder="Please specify" class="mt-3 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
              </div>

              <div>
                <label for="message" class="mb-1.5 block text-sm font-medium text-gray-700">Your Message</label>
                <textarea id="message" v-model="form.message" rows="5" required placeholder="Tell us more..." class="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 transition focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>

              <div class="flex items-center gap-3">
                <button type="submit" :disabled="formStatus === 'loading'" class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50">
                  <i v-if="formStatus === 'loading'" class="ri-loader-4-line animate-spin" />
                  <i v-else class="ri-send-plane-line" />
                  {{ formStatus === 'loading' ? 'Sending...' : 'Send Message' }}
                </button>

                <p v-if="formStatus === 'error'" class="text-sm text-red-600">
                  {{ formErrorMessage }}
                </p>
              </div>
            </form>

            <!-- Success state -->
            <div v-else class="flex flex-col items-center py-6 text-center">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                <i class="ri-check-line" />
              </div>
              <h3 class="mt-4 text-lg font-semibold text-gray-900">
                Message Sent!
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                Thanks for reaching out. We'll get back to you as soon as we can.
              </p>
              <button type="button" class="mt-4 cursor-pointer text-sm font-semibold text-primary-600 hover:underline" @click="formStatus = 'idle'">
                Send another message
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ? MARK: Contact Info -->
      <section id="contact-info" class="scroll-mt-28 py-12">
        <div class="mx-auto max-w-3xl">
          <div class="mb-8">
            <p class="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-600">
              Other Ways to Reach Us
            </p>
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Contact Information
            </h2>
            <p class="mt-3 text-base leading-relaxed text-gray-600">
              You can also reach us through any of the following channels.
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

      <!-- ? MARK: Contact the team card -->
      <div class="container mx-auto px-4 py-8">
        <div class="mx-auto max-w-3xl">
          <div class="flex items-start gap-4 rounded-2xl border border-primary-200 bg-primary-50 p-6">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg text-primary-600">
              <i class="ri-phone-line" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-semibold text-primary-900">
                Looking for {{ lguName }} LGU Hotlines?
              </h3>
              <p class="mt-1 text-sm text-primary-700">
                If you need emergency numbers or official contact lines for {{ lguName }}'s LGU offices and services, you'll find them on our Hotlines page.
              </p>
              <NuxtLink to="/hotlines" class="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700">
                <i class="ri-team-line" />
                View Hotlines
                <i class="ri-arrow-right-line" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UiPageWithToc>
  </div>
</template>
