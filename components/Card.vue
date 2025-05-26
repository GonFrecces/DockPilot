<script setup lang="ts">

const mostrar = ref(false)
function update(nuevoValor: boolean) {
    mostrar.value = nuevoValor
}
</script>
<template>
    <div class="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10">
        <div class="col-start-3 row-start-3 flex max-w-5xl flex-col bg-gray-100 p-2 dark:bg-white/10">
            <div class="rounded-xl bg-white p-10 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
                <Tabs :mostrar="mostrar" @update-mostrar="update" />
            </div>
        </div>
        <p>Estado actual: {{ mostrar }}</p>
        <!-- <div class="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
  <div class="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
  <div class="relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)"></div>
  <div class="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div> -->
    </div>
    <div v-if="mostrar" class="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10">
        <div class="col-start-3 row-start-3 flex max-w-5xl flex-col bg-gray-100 p-2 dark:bg-white/10">
            <div class="rounded-xl bg-white p-10 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
                <Tabs :mostrar="mostrar" @update-mostrar="update" />
            </div>
        </div>
    </div>
</template>
