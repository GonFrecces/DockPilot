<script setup lang="ts">
  useHead({
    titleTemplate: 'Dock - Pilot',
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