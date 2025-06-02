<script setup lang="ts">
import Editor from '@/components/Editor.vue'
const mostrar = ref(false)
function update(nuevoValor: boolean) {
    mostrar.value = nuevoValor
}
</script>

<template>
    <div class="flex flex-col sm:flex-row min-h-screen w-full h-full transition-all duration-500 ease-in-out"
        :class="mostrar ? '-translate-x-2 sm:-translate-x-4' : 'translate-x-full sm:translate-x-96'">
        <div class="relative grid min-h-screen h-full grid-cols-[0.5rem_auto_0.5rem] sm:grid-cols-[1fr_2rem_auto_1rem_1fr] lg:grid-cols-[1fr_8.5rem_auto_2.5rem_1fr] grid-rows-[0.5rem_auto_0.5rem] sm:grid-rows-[1fr_1px_auto_1px_1fr]">
            <div class="col-start-2 sm:col-start-3 row-start-2 sm:row-start-3 flex w-full h-full flex-col bg-gray-100 p-1 sm:p-2 lg:p-2 dark:bg-white/10">
                <div class="rounded-lg sm:rounded-xl bg-white p-3 sm:p-5 lg:p-7 text-xs sm:text-sm lg:text-base leading-5 sm:leading-6 lg:leading-7 text-gray-700 dark:bg-gray-950 dark:text-gray-300 w-full">
                    <Tabs :mostrar="mostrar" @update-mostrar="update" />
                </div>
            </div>
        </div>
        <transition enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform scale-95" enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95">
            <div v-if="mostrar" class="relative grid min-h-screen h-full grid-cols-[0.5rem_auto_0.5rem] sm:grid-cols-[1fr_2rem_auto_1rem_1fr] lg:grid-cols-[1fr_3.5rem_auto_2.5rem_1fr] grid-rows-[0.5rem_auto_0.5rem] sm:grid-rows-[1fr_1px_auto_1px_1fr]">
                <div class="col-start-3 row-start-3 flex w-full h-full my-auto flex-col bg-gray-100 p-2 dark:bg-white/10">
                    <div class="rounded-xl bg-white p-7 h-auto text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300 w-full ">
                        <Editor />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>