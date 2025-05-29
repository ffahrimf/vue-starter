<template>
  <div class="toast" ref="root" v-element-hover="onHover" :class="classNames">
    <div class="toast__icon">
      <component :is="outline[icon as keyof typeof outline]" class="w-6" />
    </div>
    <div class="toast__body">
      <p class="text-[13px] font-semibold capitalize">{{ type }}</p>
      <div class="toast__title">{{ title }}</div>
    </div>
    <div data-testid="toast-close" class="ml-2" @click="emit('dismissed')">
      <component
        :is="solid['XMarkIcon']"
        class="w-5 text-gray-500 hover:text-gray-600 cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import * as solid from "@heroicons/vue/24/solid";
import * as outline from "@heroicons/vue/24/outline";

import { vElementHover } from "@vueuse/components";

// const type = ref<string>("");
const emit = defineEmits(["dismissed"]);

const props = defineProps({
  variant: String,
  title: String,
  icon: { type: String, default: "ExclamationCircleIcon" },
  type: String,
  duration: {
    type: Number,
    default: 6000
  }
});

const root = ref<HTMLElement | null>(null);
const isHovered = ref<boolean>(false);
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

// const setType =

const onHover = (state: boolean) => {
  isHovered.value = state;
  if (state) {
    if (timeout.value) {
      clearInterval(timeout.value);
    }
  } else {
    startCount();
  }
};

const countdown = ref<number>(props.duration ? props.duration / 1000 : 0);

const classNames = computed(() => {
  const result = ["toast"];
  if (props.type) result.push(`toast--${props.type}`);
  return result;
});

onMounted(() => {
  countdown.value = props.duration ? props.duration / 1000 : 0;
  startCount();
});

const startCount = () => {
  if (Number.isFinite(props.duration) && props.duration > 0) {
    timeout.value = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        emit("dismissed");
      }
    }, 1000);
  }
};

onUnmounted(() => {
  if (timeout.value) clearTimeout(timeout.value);
});
</script>

<style lang="postcss">
.toast {
  @apply flex items-center px-3 py-3 rounded-xl w-72 md:w-[350px] overflow-hidden bg-white;
}
.toast--success {
  @apply shadow-[0px_10px_40px_-10px_rgba(34,197,94,0.4)]; /* bg-green-500 */
}

.toast--error {
  @apply shadow-[0px_10px_40px_-10px_rgba(239,68,68,0.4)]; /* bg-red-500 */
}

.toast--warning {
  @apply shadow-[0px_10px_40px_-10px_rgba(249,115,22,0.4)]; /* bg-orange-500 */
}

.toast--info {
  @apply shadow-[0px_10px_40px_-10px_rgba(115,115,115,0.4)]; /* bg-blue-500 */
}

.toast--notification {
  @apply shadow-[0px_10px_40px_-10px_rgba(77,77,255)]; /* bg-primary */
}

.toast__icon {
  @apply shrink-0 p-1.5 mr-3 rounded-lg text-white;
}

.toast__body {
  @apply grow flex  flex-col;
}

.toast__title {
  @apply text-xs font-medium break-all leading-[1.3] text-gray-500;
}

.toast--info .toast__icon {
  @apply bg-neutral-500;
}

.toast--error .toast__icon {
  @apply bg-red-500;
}

.toast--success .toast__icon {
  @apply bg-green-500;
}

.toast--warning .toast__icon {
  @apply bg-orange-500;
}

.toast--notification .toast__icon {
  @apply bg-primary;
}
</style>
