import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

import store from "../store";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/list",
    name: "List",
    // route level code-splitting
    // this generates a separate chunk (list.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { getters: { isAuthenticated } = {} } = store;

  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router;
