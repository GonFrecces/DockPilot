<script setup lang="ts">

const mostrar = ref(false)
function update(nuevoValor: boolean) {
    mostrar.value = nuevoValor
}
import { ref, onMounted } from 'vue';
import Prism from 'prismjs';

const codeBlock = ref(null);
const dockerCode = `FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
`;

onMounted(() => {
  if (codeBlock.value) {
    Prism.highlightElement(codeBlock.value);
  }
});
</script>

<template>
    <div class="flex flex-row min-h-screen w-full transition-all duration-500 ease-in-out"
        :class="mostrar ? '' : 'translate-x-72'">
        <div class="relative grid min-h-screen h-full grid-cols-[1fr_3.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10 transition-all duration-500 ease-in-out">
            <div class="col-start-3 row-start-3 flex w-full h-full flex-col bg-gray-100 p-2 dark:bg-white/10">
                <div class="rounded-xl bg-white p-7 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300 w-full">
                    <Tabs :mostrar="mostrar" @update-mostrar="update" />
                </div>
            </div>
        </div>
        <transition 
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform scale-95" 
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition-all duration-300 ease-in" 
            leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95">
            <div v-if="mostrar" class="relative grid min-h-screen h-2/6 w-1/2 grid-cols-[1fr_1.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10">
                <div class="col-start-3 row-start-3 flex max-w-lg h-full flex-col bg-gray-100 p-2 dark:bg-white/10">
                    <div class="rounded-xl bg-white h-full p-10 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
                        <pre><code ref="codeBlock" class="language-docker">{{ dockerCode }}</code></pre>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>