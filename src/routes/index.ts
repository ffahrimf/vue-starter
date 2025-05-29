import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext
} from "vue-router";
import landingRoutes from "./landing/index";
import dashboardRoutes from "./dashboard";
import authRoutes from "./auth";
import { mainStore } from "../store";
import { updateMetaTags } from "./meta";

const routes: Array<RouteRecordRaw> = [
  ...landingRoutes,
  ...dashboardRoutes,
  ...authRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const store = mainStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.isAuthenticated) {
        next({
          path: "/auth/login",
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
      if (store.isAuthenticated) {
        const redirect = (to.query.redirect as string | undefined) ?? null;
        next({ path: redirect ?? "/" });
      } else {
        next();
      }
    } else {
      next();
    }

    updateMetaTags(to);

    next();
  }
);

export default router;
