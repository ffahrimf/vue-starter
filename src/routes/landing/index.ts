import { RouteRecordRaw } from "vue-router";

const landingRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "landing",
    component: () => import("../../views/landing/index.vue"),
    meta: {
      requiresAuth: false,
      title: "Landing Page",
      description: "Selamat datang!"
    }
  }
];

export default landingRoutes;
