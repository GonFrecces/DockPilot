<script setup lang="ts">
  useHead({
    titleTemplate: 'Dock - Pilot',
    bodyAttrs: {
      class: 'bg-gray-100 dark:bg-gray-950',
    },
    meta: [
      {
        name: 'description',
        content: 'Dock is a powerful and flexible component for building complex layouts in Vue.js applications.',
      },
    ],
  })
  const layout = 'default'
</script>
<template>
  <UApp>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>