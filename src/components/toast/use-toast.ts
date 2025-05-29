import { useSingleton } from "../../composable/use-singleton";

interface ToastOptions {
  type?: string;
  variant?: string;
  title?: string;
  text?: string;
  position?: string;
}

let optionDefault: ToastOptions = {
  type: "success",
  variant: "simple",
  title: "Hello, World!",
  text: "This is a toast message.",
  position: "top-right"
};

export async function toast(option: ToastOptions = {}): Promise<void> {
  const ToastRootModule = await import("./toast-root.vue");
  const ToastRoot = ToastRootModule.default;

  let mergedOption: ToastOptions = { ...optionDefault, ...option };

  const toaster = await useSingleton(ToastRoot);

  await toaster.add(mergedOption);
}
