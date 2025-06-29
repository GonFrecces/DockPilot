<template>
    <div class="h-full max-h-[500px] overflow-hidden flex flex-col">
        <div class="flex flex-col h-full">
            <pre><code ref="codeBlock" class="overflow-y-auto flex flex-col h-96 sm:h-96 lg:h-96 xl:h-[465px]" v-html="highlightedCode"></code></pre>   
        </div>
    </div>
</template>

<script setup lang="ts">
interface DockerConfig {
    projectType: 'node' | 'typescript' | 'python' | 'nginx' | 'custom'
    port: number
    baseImage: string
    workdir: string
    includeHealthcheck: boolean
    multiStage: boolean
}

// Props
interface Props {
    height?: string
    defaultProject?: DockerConfig['projectType']
}

const props = withDefaults(defineProps<Props>(), {
    height: 'auto',
    defaultProject: 'typescript'
})

// Estado reactivo
const config = ref<DockerConfig>({
    projectType: props.defaultProject,
    port: 3000,
    baseImage: 'node:18-alpine',
    workdir: '/app',
    includeHealthcheck: true,
    multiStage: false
})

const dockerfileCode = ref<string>('')
const codeBlock = ref<HTMLElement | null>(null)

const highlightedCode = computed(() => {
    return dockerfileCode.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
})

// Acceso a highlight.js
// Importa highlight.js directamente para evitar problemas de tipado
// Si usas highlight.js como dependencia, asegúrate de instalarlo: npm install highlight.js
import hljs from 'highlight.js'

// Templates de Dockerfile
const templates = {
    typescript: (): string => {
        const baseTemplate = `${config.value.multiStage ? '# Build stage' : '# Imagen base para TypeScript/Node.js'}
FROM ${config.value.baseImage} ${config.value.multiStage ? 'AS builder' : ''}

# Instalar dependencias globales necesarias
RUN apk add --no-cache python3 make g++

# Establecer directorio de trabajo
WORKDIR ${config.value.workdir}

# Copiar archivos de configuración
COPY package*.json tsconfig.json ./
COPY src/ ./src/

# Instalar dependencias ${config.value.multiStage ? '(incluye dev dependencies)' : ''}
RUN npm ci ${config.value.multiStage ? '' : '--only=production'} && npm cache clean --force

${config.value.multiStage ? `# Compilar TypeScript
RUN npm run build

# Production stage
FROM ${config.value.baseImage} AS production

# Instalar solo dependencias de runtime
RUN apk add --no-cache dumb-init

WORKDIR ${config.value.workdir}

# Copiar package.json y instalar solo prod dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar código compilado desde build stage
COPY --from=builder ${config.value.workdir}/dist ./dist
COPY --from=builder ${config.value.workdir}/package*.json ./` : `# Compilar TypeScript
RUN npm run build`}

# Crear usuario no privilegiado
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S typescript -u 1001 -G nodejs

# Cambiar permisos
RUN chown -R typescript:nodejs ${config.value.workdir}
USER typescript

# Variables de entorno optimizadas para TypeScript
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=${config.value.port}
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Exponer puerto
EXPOSE ${config.value.port}

${config.value.includeHealthcheck ? `# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \\
  CMD curl -f http://localhost:${config.value.port}/health || exit 1` : ''}

# Usar dumb-init para manejo correcto de señales
${config.value.multiStage ? 'ENTRYPOINT ["dumb-init", "--"]' : ''}

# Comando de inicio
CMD ["${config.value.multiStage ? 'node' : 'npm'}", "${config.value.multiStage ? 'dist/index.js' : 'run start'}"]`

        return baseTemplate
    },

    node: (): string => `# Imagen base optimizada para Node.js
FROM ${config.value.baseImage}

# Establecer directorio de trabajo
WORKDIR ${config.value.workdir}

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Construir aplicación si es necesario
RUN npm run build 2>/dev/null || echo "No build script found"

# Crear usuario no privilegiado
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nuxtjs -u 1001 -G nodejs

# Cambiar permisos
RUN chown -R nuxtjs:nodejs ${config.value.workdir}
USER nuxtjs

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=${config.value.port}

# Exponer puerto
EXPOSE ${config.value.port}

${config.value.includeHealthcheck ? `# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:${config.value.port}/health || exit 1` : ''}

# Comando de inicio
CMD ["npm", "start"]`,

    python: (): string => `# Imagen base para Python
FROM python:3.11-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \\
    curl \\
    gcc \\
    && rm -rf /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR ${config.value.workdir}

# Copiar archivos de dependencias
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código fuente
COPY . .

# Crear usuario no privilegiado
RUN useradd --create-home --shell /bin/bash app && \\
    chown -R app:app ${config.value.workdir}
USER app

# Variables de entorno
ENV PYTHONPATH=${config.value.workdir}
ENV PYTHONUNBUFFERED=1

# Exponer puerto
EXPOSE ${config.value.port}

${config.value.includeHealthcheck ? `# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:${config.value.port}/health || exit 1` : ''}

# Comando de inicio
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${config.value.port}"]`,

    nginx: (): string => `# Imagen base de Nginx
FROM nginx:alpine

# Copiar archivos estáticos
COPY dist/ /usr/share/nginx/html/

# Copiar configuración personalizada si existe
COPY nginx.conf /etc/nginx/nginx.conf 2>/dev/null || echo "Using default nginx config"

# Configurar Nginx para puerto personalizado
RUN sed -i 's/listen       80;/listen       ${config.value.port};/' /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE ${config.value.port}

${config.value.includeHealthcheck ? `# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:${config.value.port} || exit 1` : ''}

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]`,

    custom: (): string => `# Dockerfile personalizado
FROM ${config.value.baseImage}

# Establecer directorio de trabajo
WORKDIR ${config.value.workdir}

# Instalar dependencias del sistema (ejemplo)
# RUN apk add --no-cache <paquetes>

# Copiar archivos
COPY . .

# Instalar dependencias de la aplicación
# RUN <comando-instalacion>

# Exponer puerto
EXPOSE ${config.value.port}

${config.value.includeHealthcheck ? `# Healthcheck básico
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:${config.value.port}/health || exit 1` : ''}

# Comando de inicio (personalizar según necesidades)
CMD ["echo", "Configurar comando de inicio personalizado"]`
}

// Métodos
const generateDockerfile = (): void => {
    dockerfileCode.value = templates[config.value.projectType]()
    nextTick(() => {
        applyHighlighting()
    })
    const applyHighlighting = (): void => {
        if (codeBlock.value) {
            hljs.highlightElement(codeBlock.value)
        }
    }
}


/* const copyToClipboard = async (): Promise<void> => {
    try {
        await navigator.clipboard.writeText(dockerfileCode.value)
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    } catch (err) {
        console.error('Error al copiar:', err)
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea')
        textArea.value = dockerfileCode.value
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    }
} */

const downloadDockerfile = (): void => {
    const blob = new Blob([dockerfileCode.value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Dockerfile'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

const resetToDefaults = (): void => {
    config.value = {
        projectType: props.defaultProject,
        port: 3000,
        baseImage: getDefaultBaseImage(props.defaultProject),
        workdir: '/app',
        includeHealthcheck: true,
        multiStage: false
    }
    generateDockerfile()
}

const getDefaultBaseImage = (projectType: DockerConfig['projectType']): string => {
    const imageMap: Record<DockerConfig['projectType'], string> = {
        node: 'node:18-alpine',
        typescript: 'node:18-alpine',
        python: 'python:3.11-slim',
        nginx: 'nginx:alpine',
        custom: 'alpine:latest'
    }
    return imageMap[projectType]
}

// Watchers
watch(() => config.value.projectType, (newType) => {
    config.value.baseImage = getDefaultBaseImage(newType)
    generateDockerfile()
})

// Lifecycle
onMounted(() => {
    generateDockerfile()
})
</script>