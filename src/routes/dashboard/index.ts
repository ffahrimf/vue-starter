import { RouteRecordRaw } from "vue-router";

const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "in-app",
    component: () => import("../../views/home.vue"),
    meta: {
      requiresAuth: true,
      title: "Dashboard",
      description: "Berhasil Login"
    }
  }
];

export default dashboardRoutes;
