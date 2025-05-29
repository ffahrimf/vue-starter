import { App, defineAsyncComponent } from "vue";

const hOverlay = defineAsyncComponent(
  () => import("../components/base/h-overlay.vue")
);
export const globalcomponent = (app: App): void => {
  app.component("h-overlay", hOverlay);
};
