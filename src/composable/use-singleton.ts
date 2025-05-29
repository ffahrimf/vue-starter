import PQueue from "./use-queue";
import {
  h,
  createApp,
  ref,
  unref,
  shallowRef,
  triggerRef,
  nextTick,
  Component,
  ComponentPublicInstance
} from "vue";

// Define the instance structure
interface Instance {
  component: Component;
  ref: ReturnType<typeof ref>;
}

let instances: ReturnType<typeof shallowRef<Map<string, Instance>>> | undefined;
let container: ReturnType<typeof createApp> | undefined;

// Define PQueue to use a specific type for jobs (ComponentPublicInstance | void)
const queue = new PQueue();

async function createInstance(
  id: string,
  component: Component
): Promise<ComponentPublicInstance | undefined> {
  if (!instances) instances = shallowRef(new Map<string, Instance>());

  if (!container) {
    const target = document.createElement("div");
    const app = createApp({
      name: "GlobalContainer",
      render: () => {
        return [...(instances?.value?.values() || [])].map((item) => {
          return h(item.component, { ref: item.ref });
        });
      }
    });

    document.body.append(target);
    app.mount(target);

    target.id = "global";
    container = app;
  }

  let instance = instances?.value?.get(id);
  if (!instance) {
    instance = { component, ref: ref() };
    instances?.value?.set(id, instance);
    triggerRef(instances);

    await nextTick();
  }

  return unref(instance?.ref) as ComponentPublicInstance | undefined;
}

async function removeInstance(id: string): Promise<void> {
  if (instances && container) {
    instances.value?.delete(id);
    await nextTick();
  }
}

export async function resetInstance(): Promise<void> {
  if (instances) {
    instances.value?.clear();
    await nextTick();
  }
}

export async function useSingleton(component: Component): Promise<any> {
  // Pass a function that returns a Promise of the correct type
  return await queue.add(() =>
    createInstance(String(component.name), component)
  );
}

export async function removeSingleton(component: Component): Promise<any> {
  // Pass a function that returns a Promise<void>
  return await queue.add(() => removeInstance(String(component.name)));
}
