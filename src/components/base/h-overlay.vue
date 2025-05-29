<template>
  <transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0 ease-in-out"
    enter-active-class="transition ease-in-out duration-300"
    leave-active-class="transition ease-in-out duration-300"
  >
    <div
      v-if="value"
      :class="`${
        absolute ? 'absolute w-full h-full' : 'fixed w-screen h-screen'
      } inset-0 ${color} ${opacity} top-0 left-0 z-40`"
      role="overlay"
      style="border-radius: inherit"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
interface PropsIF {
  value: boolean;
  color?: string;
  opacity?: string;
  absolute?: boolean;
}
withDefaults(defineProps<PropsIF>(), {
  value: false,
  color: "bg-white",
  opacity: "bg-opacity-80",
  absolute: false
});
</script>
