<script lang="ts" setup>
import type { CheckboxGroupItem, CheckboxGroupValue } from '@nuxt/ui'

const props = defineProps({
  mostrar: Boolean
})
const emit = defineEmits(['update-mostrar'])

function toggle() {
  emit('update-mostrar', !props.mostrar)
}

const state = reactive({
    imagen_base: 'node',
    version: '18-alpine',
    paquetes: '',
    puerto: '',
    entrypoint: '',
    cmd: ''
})

const techOptions = [
    {
        name: "node",
        type: "frontend",
        frameworks: ["React", "Vue", "Angular", "Svelte"]
    },
    {
        name: "Python",
        type: "backend",
        frameworks: ["Django", "Flask", "FastAPI"]
    },
    {
        name: "Go",
        type: "backend",
        frameworks: ["Gin", "Fiber"]
    }
]

const selectedLanguage = ref<{ label: string; value: string } | undefined>(undefined)
const selectedFramework = ref<{ label: string; value: string } | undefined>(undefined)

const languageOptions = computed(() => {
    return techOptions.map(tech => ({
        label: tech.name,
        value: tech.name
    }))
})
const frameworkOptions = computed(() => {
    const selected = techOptions.find(t => t.name === selectedLanguage.value?.value)
    return selected?.frameworks.map(framework => ({
        label: framework,
        value: framework
    })) || []
})

watch(selectedLanguage, () => {
    selectedFramework.value = undefined
})

const instructions = ref<CheckboxGroupItem[]>([
    { id: 'add', label: 'ADD', description: 'Add local or remote files and directories.' },
    { id: 'arg', label: 'ARG', description: 'Use build-time variables.' },
    { id: 'cmd', label: 'CMD', description: 'Specify default commands.' },
    { id: 'copy', label: 'COPY', description: 'Copy files and directories.' },
    { id: 'entrypoint', label: 'ENTRYPOINT', description: 'Specify default executable.' },
    { id: 'env', label: 'ENV', description: 'Set environment variables.' },
    { id: 'expose', label: 'EXPOSE', description: 'Describe which ports your application is listening on.' },
    { id: 'from', label: 'FROM', description: 'Create a new build stage from a base image.' },
    { id: 'healthcheck', label: 'HEALTHCHECK', description: 'Check a container\'s health on startup.' },
    { id: 'label', label: 'LABEL', description: 'Add metadata to an image.' },
    { id: 'maintainer', label: 'MAINTAINER', description: 'Specify the author of an image.' },
    { id: 'onbuild', label: 'ONBUILD', description: 'Specify instructions for when the image is used in a build.' },
    { id: 'run', label: 'RUN', description: 'Execute build commands.' },
    { id: 'shell', label: 'SHELL', description: 'Set the default shell of an image.' },
    { id: 'stopsignal', label: 'STOPSIGNAL', description: 'Specify the system call signal for exiting a container.' },
    { id: 'user', label: 'USER', description: 'Set user and group ID.' },
    { id: 'volume', label: 'VOLUME', description: 'Create volume mounts.' },
    { id: 'workdir', label: 'WORKDIR', description: 'Set the working directory.' },
    { id: 'onbuild', label: 'ONBUILD', description: 'Specify instructions for when the image is used in a build.' },
    { id: 'run', label: 'RUN', description: 'Execute build commands.' },
    { id: 'shell', label: 'SHELL', description: 'Set the default shell of an image.' },
    { id: 'stopsignal', label: 'STOPSIGNAL', description: 'Specify the system call signal for exiting a container.' },
    { id: 'user', label: 'USER', description: 'Set user and group ID.' },
    { id: 'volume', label: 'VOLUME', description: 'Create volume mounts.' },
    { id: 'workdir', label: 'WORKDIR', description: 'Set the working directory.' }
])
// Array para almacenar las instrucciones seleccionadas
const selectedInstructions = ref<CheckboxGroupValue[]>([])

</script>
<template>
    <div class="max-h-screen">
        <UForm :state="state" class="flex flex-col gap-4">
            <USelectMenu v-model="selectedLanguage" :items="languageOptions" placeholder="Selecciona Lenguaje"
                class="w-48" />
            <USelectMenu v-model="selectedFramework" :items="frameworkOptions" placeholder="Selecciona Framework"
                :disabled="!selectedLanguage" class="w-48 hover:cursor-pointer" />
            <div>
                <UCheckboxGroup v-model="selectedInstructions" :items="instructions" legend="Instrucciones" variant="card" orientation="vertical" class="max-h-64 overflow-y-auto"/>
            </div>
            <UButton label="Generar" type="submit" variant="solid" class="self-end hover:cursor-pointer hover:text-amber-50" @click="toggle"/>
        </UForm>
    </div>
</template>