import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

function setTitle(to, from, next) {
  document.title = to.meta.title;
  next();
}

router.beforeEach((to, from, next) => {
  setTitle(to, from, next);
});

export default router;
