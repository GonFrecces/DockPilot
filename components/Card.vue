<!-- <script setup lang="ts">
import Editor from '@/components/Editor.vue'
const mostrar = ref(false)

function update(nuevoValor: boolean) {
    mostrar.value = nuevoValor
}
</script>

<template>
    <div class="flex flex-row min-h-screen w-full h-full transition-all duration-500 ease-in-out">

        
        <div class="relative grid min-h-screen h-full w-full [grid-template-columns:0.5rem_0rem_auto_0rem_0.5rem] sm:[grid-template-columns:0.5fr_0rem_auto_0rem_0.5fr] [grid-template-rows:0.5rem_auto_0.5rem]
        sm:[grid-template-rows:0.5fr_0rem_auto_0rem_0.5fr] md:[grid-template-rows:1fr_2px_auto_1px_1fr] lg:[grid-template-rows:1fr_0px_auto_0px_1fr]
        ">
            <div :class="[
                'col-start-2 sm:col-start-3 row-start-2 sm:row-start-3 flex w-auto h-full flex-col bg-gray-100 p-1 sm:p-2 lg:p-2 dark:bg-white/10 transition-transform duration-300 ease-in-out',
                mostrar
                    ? 'translate-x-0 sm:translate-x-0 md:translate-x-0 lg:translate-x-0 xl:translate-x-0'
                    : '-translate-x-10 sm:-translate-x-16 md:-translate-x-20 lg:-translate-x-24 xl:-translate-x-[0px]'
            ]">
                <div class="rounded-lg sm:rounded-xl bg-white p-3 sm:p-5 md:p-6 lg:p-7 text-xs sm:text-sm lg:text-base leading-5 sm:leading-6 lg:leading-7 text-gray-700 dark:bg-gray-950 dark:text-gray-300 w-full">
                    <Tabs :mostrar="mostrar" @update-mostrar="update" />
                </div>
            </div>
        </div>

        <transition enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform scale-95" enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition-all duration-300 ease-in" leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95">
            <div v-show="mostrar"
                class="relative grid min-h-screen h-full w-full grid-cols-[0.5rem_auto_0.5rem] sm:grid-cols-[1fr_0rem_auto_0rem_1fr] md:grid-cols-[0.5fr_0rem_auto_0rem_0.5fr] lg:grid-cols-[0.5fr_0rem_auto_0rem_0.5fr] grid-rows-[0.5rem_auto_0.5rem] sm:grid-rows-[0.5fr_0rem_auto_0rem_0.5fr] md:grid-rows-[1fr_2px_auto_1px_1fr] lg:grid-rows-[1fr_0px_auto_0px_1fr]">
                <div class="col-start-2 sm:col-start-3 row-start-2 sm:row-start-3 flex w-full h-full flex-col bg-gray-100 p-1 sm:p-2 lg:p-2 dark:bg-white/10 transition-transform duration-300 ease-in-out">
                    <div class="rounded-lg sm:rounded-xl bg-white p-3 sm:p-5 md:p-6 lg:p-7 h-auto text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300 w-full">
                        <Editor />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
 -->

<script setup lang="ts">
import Editor from '@/components/Editor.vue'
const mostrar = ref(false)

function update(nuevoValor: boolean) {
    mostrar.value = nuevoValor
}
</script>

<template>
    <div class="min-h-screen h-full w-full px-4">
        <!-- Container principal que cambia justificación -->
        <div :class="[
            'flex min-h-screen w-full h-full transition-all duration-500 ease-in-out',
            // Mobile: siempre columna
            'flex-col',
            // Desktop: fila
            'lg:flex-row',
            // Justificación: centrado cuando no hay editor, inicio cuando sí hay
            'justify-center items-center'
        ]">
            
            <!-- TABS SECTION - Se mueve del centro hacia la izquierda -->
            <div :class="['transition-all duration-300 ease-in-out', ['w-full sm:w-1/2 md:w-1/2 lg:w-1/2']]">
                <div class="bg-white dark:bg-gray-950 rounded-xl p-4 sm:p-4 md:p-4 shadow-lg border border-gray-200 dark:border-gray-800">
                    <Tabs :mostrar="mostrar" @update-mostrar="update" />
                </div>
            </div>

            <!-- EDITOR SECTION - Aparece a la derecha -->
            <transition 
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 transform scale-98"
                enter-to-class="opacity-100 transform scale-100"
                leave-active-class="transition-all duration-200 ease-in-out"
                leave-from-class="opacity-100 transform scale-100"
                leave-to-class="opacity-0 transform scale-98"
            >
                <div v-show="mostrar" class="w-full lg:w-1/2 lg:pl-4">
                    <div class="bg-white dark:bg-gray-950 rounded-xl p-4 sm:p-4 md:p-4 shadow-lg border border-gray-200 dark:border-gray-800 mt-4 lg:mt-0">
                        <Editor />
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>