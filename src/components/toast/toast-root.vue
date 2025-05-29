<template>
  <div class="toast-container" :class="classNames">
    <TransitionGroup tag="div" name="toast">
      <Toast
        v-for="(item, i) in items"
        :key="item._id"
        :variant="item.variant"
        :title="item.title"
        :icon="item.icon"
        :type="item.type"
        :duration="item.duration"
        @dismissed="remove(i)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import Toast from "./toast.vue";

defineOptions({
  name: "ToastRoot"
});

interface ToastItem {
  _id: symbol;
  variant?: string;
  title?: string;
  icon: string;
  type: string;
  duration?: number;
  position?: string;
}

const items = ref<ToastItem[]>([]);
const options = ref<{ position?: string } | null>(null);

const add = async (opt: Partial<ToastItem>) => {
  opt.type = opt.type ?? "info";
  items.value.push({
    ...opt,
    icon: setIcon(opt.type),
    _id: Symbol("id")
  } as ToastItem);

  options.value = opt;

  await nextTick();
};

const setIcon = (type: string): string => {
  let icon = "";
  switch (type) {
    case "success":
      icon = "CheckCircleIcon";
      break;
    case "warning":
      icon = "ExclamationTriangleIcon";
      break;
    case "notification":
      icon = "BellAlertIcon";
      break;
    case "error":
      icon = "NoSymbolIcon";
      break;
    case "info":
      icon = "InformationCircleIcon";
      break;
    default:
      icon = "ExclamationCircleIcon";
      break;
  }
  return icon;
};

const classNames = computed(() => {
  const result: string[] = [];
  if (options.value?.position) {
    result.push(`toast-container--${options.value.position}`);
  }
  return result;
});

const remove = (i: number) => {
  items.value.splice(i, 1);
};

defineExpose({
  add
});
</script>

<style lang="postcss">
.toast-container {
  @apply z-50 fixed flex flex-col space-y-2 max-h-screen overflow-visible;

  &--top-right {
    @apply top-2 right-4;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--top-center {
    @apply top-2 left-1/2 -translate-x-1/2;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-y-20;
      }
    }
  }

  &--top-left {
    @apply top-2 left-4;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }

  &--bottom-right {
    @apply bottom-2 right-4;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-x-20;
      }
    }
  }

  &--bottom-center {
    @apply bottom-2 left-1/2 -translate-x-1/2;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 translate-y-20;
      }
    }
  }

  &--bottom-left {
    @apply bottom-2 left-4;

    .toast {
      &-enter-from,
      &-leave-to {
        @apply opacity-0 -translate-x-20;
      }
    }
  }
}

.toast {
  @apply will-change-[opacity,transform] my-2;

  &-enter-active,
  &-leave-active {
    @apply transition-all duration-150;
  }
}
</style>
