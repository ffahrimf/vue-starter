import { RouteRecordRaw } from "vue-router";

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/auth/login.vue"),
    meta: {
      requiresVisitor: true,
      title: "User Login",
      description: "Masuk ke akun Anda"
    }
  }
];

export default authRoutes;
