<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const props = defineProps<{
    mostrar?: boolean
}>()

const emit = defineEmits(['update-mostrar'])

function resend(valor: boolean) {
  emit('update-mostrar', valor)
}

const items = [
    {
        label: 'GitHub Actions',
        description: 'Manage your GitHub Actions settings here.',
        icon: 'i-lucide-github',
        slot: 'github' as const
    },
    {
        label: 'Dockerfile',
        description: 'Manage your Dockerfile settings here.',
        icon: 'tabler:brand-docker',
        slot: 'docker' as const
    },
    {
        label: 'GitLab CI/CD',
        description: 'Manage your GitLab CI/CD settings here.',
        icon: 'i-lucide-gitlab',
        slot: 'gitlab' as const
    },
    {
        label: 'Jenkinsfile',
        description: 'Manage your Jenkinsfile settings here.',
        icon: 'file-icons:jenkins',
        slot: 'jenkins' as const
    },
    {
        label: 'Railway/Render',
        description: 'Manage your Railway/Render settings here.',
        icon: 'i-lucide-server',
        slot: 'railway' as const
    }
] satisfies TabsItem[]

</script>

<template>
    <UTabs :items="items" variant="link" class="gap-4 w-full" :ui="{ trigger: 'grow' }" :mostrar="props.mostrar">
        <template #github="{ item }">
            <p class="text-muted mb-4">
                {{ item.description }}
            </p>
        </template>

        <template #docker="{ item }">
            <p class="text-muted mb-4">
                {{ item.description }}
            </p>

            <DockerfileForm :mostrar="mostrar" @update-mostrar="resend" />
        </template>

        <template #gitlab="{ item }">
            <p class="text-muted mb-4">
                {{ item.description }}
            </p>

            <DockerfileForm :mostrar="mostrar" @update-mostrar="resend" />
        </template>

        <template #jenkins="{ item }">
            <p class="text-muted mb-4">
                {{ item.description }}
            </p>

            <DockerfileForm :mostrar="mostrar" @update-mostrar="resend" />
        </template>

        <template #railway="{ item }">
            <p class="text-muted mb-4">
                {{ item.description }}
            </p>

            <DockerfileForm :mostrar="mostrar" @update-mostrar="resend" />
        </template>
    </UTabs>
</template>
