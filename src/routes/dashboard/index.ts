import { RouteRecordRaw } from "vue-router";

const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "in-app",
    component: () => import("../../views/dashboard/index.vue"),
    meta: {
      requiresAuth: true,
      title: "Dashboard",
      description: "Berhasil Login"
    }
  }
];

export default dashboardRoutes;
